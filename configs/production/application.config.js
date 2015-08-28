import path from 'path';

export default {
    static: {
        path: path.resolve(__dirname, 'build/'),
        url: '/assets/'
    },
    scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0-beta1/react.min.js'
    ],
    styles: [
        'https://fonts.googleapis.com/css?family=Maven+Pro:400,500,900'
    ]
};
