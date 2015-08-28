import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import {appConfig} from '../../configs';

var cwd = process.cwd();
var OUTPUT_PATH = path.join(cwd, 'build');

export default {
    devtool: 'eval',
    entry: [
        // Entry points for bundles should be computed in server application.
    ],
    output: {
        path: OUTPUT_PATH,
        filename: '[name].js',
        publicPath: appConfig.static.url,
        library: "Page",
        libraryTarget: "var"
    },
    resolve: {
        root: [
            path.join(cwd, 'components')
        ]
    },
    externals: [
        {
            'react': 'var React'
        }
    ],
    module: {
        loaders: [
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: `file`
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css', 'postcss', 'stylus']
            }
        ]
    },
    postcss: function () {
        return [autoprefixer]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProgressPlugin((percentage, message) => {
            var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
            var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '% :' + message + MOVE_LEFT);
        }),
        function () {
            this.plugin('done', (stats) => {
                console.log(stats.toString({
                    chunks: false,
                    colors: true
                }));
            });
        }
    ]
};
