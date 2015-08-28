# React Landing

Experimental approach to build isomorphic landing pages on React components.

# Usage

Before usage you should install all dependencies:

    npm install

React Landing runs little node server to build static assets and pre-render markup. To start it, simply run:

    npm start

Now, you can see example Futurama page at `http://localhost:3000/futurama`.

You may also want to run React Landing in watch mode. In this mode [nodemon](https://github.com/remy/nodemon) and [webpack-dev-server](webpack.github.io/docs/webpack-dev-server.html) are running at your service:

    npm run-script watch

# Explanation

Behind React Landing lies two common ideas. First, it should separate interface development from monolithic application, which usually contains both business logic and multitude of view templates. Second, it must share components library with single-page application built on React.

# Examples

We are now experimenting with this approach at VezetVsem. Currently, you can see just one example page, but more are coming!

- [vezetvsem.ru/flat-moving](http://vezetvsem.ru/flat-moving)
