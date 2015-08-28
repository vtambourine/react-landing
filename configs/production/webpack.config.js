import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var cwd = process.cwd();
var OUTPUT_PATH = path.join(cwd, 'build');

export default {
    entry: [
        // Entry points for bundles should be computed in server application.
    ],
    output: {
        path: OUTPUT_PATH,
        filename: '[name].js',
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
                loader: 'file'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?optional=runtime'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
            }
        ]
    },
    postcss: function () {
        return [autoprefixer]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.ProgressPlugin(function(percentage, message) {
            var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
            var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
        }),
        function () {
            this.plugin("done", function (stats) {
                console.log(stats.toString({
                    chunks: false,
                    colors: true
                }));
            });
        }
    ]
};
