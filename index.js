require('babel/register');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Substitude all node imports of `styl` modules to support both webpack
// styles requires and server rendering of components.
require.extensions['.styl'] = function () {
    return '';
};

var app = require('./server');
var debug = require('debug')('landing-kit:server');
var http = require('http');

// Start bundler.
// This will build static assets once for production environment
// or run Webpack Dev Server to serve static for development.
// require('./server/bundler');

// Get port from environment and store in Express.
var port = process.env.PORT || 3000;
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific listen errors with friendly messages.
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
