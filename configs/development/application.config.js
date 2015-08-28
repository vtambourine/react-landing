import path from 'path';

export default {
    static: {
        path: path.resolve(__dirname, 'build/'),
        url: 'http://localhost:3001/assets/',
    },
    devServer: {
        host: 'localhost',
        port: 3001
    },
    scripts: [
        'http://localhost:3001/webpack-dev-server.js',
        'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0-beta1/react.js'
    ],
    styles: [
        'https://fonts.googleapis.com/css?family=Maven+Pro:400,500,900'
    ]
};
