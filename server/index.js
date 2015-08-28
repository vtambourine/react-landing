import path from 'path';
import logger from 'morgan';
import favicon from 'serve-favicon';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './router';
import {appConfig} from '../configs';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

var server = express();

server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'hbs');

server.use(compression());

server.use(favicon(path.join(PUBLIC_DIR, 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(PUBLIC_DIR));
server.use('/assets', express.static(path.join(process.cwd(), 'build')));

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello, World!');
});

// Store global lists of static files in the request.
// Later this lists will be pupulated by build results.
server.use((request, response, next) => {
    request.assets = {
        scripts: [].concat(appConfig.scripts),
        styles: [].concat(appConfig.styles)
    };
    next();
});

// Enable bundler.
// This will build static assets once for production environment
// or run Webpack Dev Server to serve static for development.
var bundler = require('./bundler.js');
server.use(bundler());

// Enable router.
// Router is responsible for decision which page component will be used
// as a root for certain request.
server.use(router);

server.use((req, res, next) => {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

if (server.get('env') === 'development') {
    server.use(function (error, req, res, next) {
        res.status(error.status || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}

server.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
});

export default server;
