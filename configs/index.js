var mode = process.env.NODE_ENV || 'development';

export var appConfig = require(`./${mode}/application.config`);
export var webpackConfig = require(`./${mode}/webpack.config`);
