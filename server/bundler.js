import fs from 'fs';
import path from 'path';
import url from 'url';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {appConfig, webpackConfig} from '../configs';

var debug = require('debug')('landing-kit:server');
var cwd = process.cwd();

var staticUrl = process.env.STATIC_URL || appConfig.static.url;

var assetsPromise = new Promise((resolve) => {
    webpackConfig.plugins.push(function() {
        this.plugin('done', (stats) => {
            var assets = stats.toJson().assetsByChunkName;
            resolve(assets);
        });
    });
});

var PAGES_DIR = path.join(cwd, 'pages/');

if (process.env.NODE_ENV === 'production') {
    // Collect dictionary of bundles.
    // Each bundle is a root components of single page.
    var entries = fs.readdirSync(PAGES_DIR).reduce((result, name) => {
        result[name] = path.join(PAGES_DIR, name, name + '.js');
        return result;
    }, {});
    webpackConfig.entry = entries;

    // Create webpack bundle compiler.
    var webpackCompiler = webpack(webpackConfig);
    webpackCompiler.run((error) => {
        if (error) {
            throw error;
        }
    });
} else {
    var entries = fs.readdirSync(PAGES_DIR).reduce((result, name) => {
        result[name] = [
            'webpack/hot/dev-server',
            `webpack-dev-server/client?${appConfig.static.url}`,
            path.join(PAGES_DIR, name, name + '.js')
        ]
        return result;
    }, {});

    webpackConfig.entry = entries;
    var webpackCompiler = webpack(webpackConfig);
    var webpackDevServer = new WebpackDevServer(webpackCompiler, {
       publicPath: appConfig.static.url,
       quiet: true,
       noInfo: true
    });

    webpackDevServer.listen(appConfig.devServer.port, appConfig.devServer.host, () => {
        debug('Webpack Dev Server is listening on port ' + appConfig.devServer.port);
    });
}

function bundler() {
    return (request, response, next) => {
        var bundles = request.bundles = {};
        assetsPromise
            .then((assets) => {
                Object.keys(assets).forEach((name) => {
                    var bundle = assets[name];
                    var scripts = [];
                    var styles = [];
                    bundles[name] = { scripts, styles };
                    if (!Array.isArray(bundle)) {
                        bundle = [bundle];
                    }
                    for (let chunk of bundle) {
                        if (chunk.match(/\.js$/)) {
                            scripts.push(url.resolve(staticUrl, chunk));
                        } else if ( chunk.match(/\.css$/)) {
                            styles.push(url.resolve(staticUrl, chunk));
                        }
                    }
                });
                next();
            })
            .catch((error) => {
                console.log(error.stack);
            });
    }
}

export default bundler;
