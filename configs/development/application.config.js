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
        'http://fonts.googleapis.com/css?family=Roboto+Slab:400&subset=latin,cyrillic',
        'http://fonts.googleapis.com/css?family=Roboto:700,500,400&subset=latin,cyrillic',
        'http://yastatic.net/bootstrap/3.3.1/css/bootstrap.min.css'
    ]
};
