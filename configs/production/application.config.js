import path from 'path';

export default {
    static: {
        path: path.resolve(__dirname, 'build/'),
        url: '/assets/'
    },
    scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0-beta1/react.min.js',
        'https://yastatic.net/jquery/2.1.4/jquery.min.js',
        'http://www.vezetvsem.ru/assets/scripts/v3/jquery.fn.vvWidgetSupport.js'
    ],
    styles: [
        'http://fonts.googleapis.com/css?family=Roboto+Slab:400&subset=latin,cyrillic',
        'http://fonts.googleapis.com/css?family=Roboto:700,500,400&subset=latin,cyrillic',
        'http://yastatic.net/bootstrap/3.3.1/css/bootstrap.min.css'
    ]
};
