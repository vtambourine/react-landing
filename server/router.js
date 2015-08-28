import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Page from './components/Page';

var router = express.Router();

router.use('/:page', (req, res, next) => {
    var data = req.body;
    if (req.query.data) {
        try {
            data = JSON.parse(req.body);
        } catch (error) {
            var error = new Error('Invalid data parameter. Expected JSON');
            error.status = 500;
            next(error);
            return;
        }
    }
    var page = req.params.page;
    var componentName = page[0].toUpperCase() + page.slice(1) + 'Page';

    // In development mode use fixture data to populate template context.
    // TODO: Figure out how to test production builds on fixture data.
    // if (process.env.NODE_ENV === 'development') {
        var fixture = require(`../tests/fixtures/${page}`);
        data = Object.assign({}, fixture, data);
    // }

    try {
        var Component = require(`../pages/${componentName}`);
        var styles = [].concat(req.assets.styles, req.bundles[componentName].styles);
        var scripts = [].concat(req.assets.scripts, req.bundles[componentName].scripts);
        var body = ReactDOM.renderToString(<Component user={data.user} content={data.content} />);
        var html =
            '<!doctype html>' +
            ReactDOM.renderToStaticMarkup(<Page
                data={data}
                styles={styles}
                scripts={scripts}
                body={body} />);

        res.send(html);
    } catch (error) {
        // TODO: Separate 404 errors from other.
        next(error);
    }
});

export default router;
