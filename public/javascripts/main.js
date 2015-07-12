require.config({
    paths: {
        'jquery': 'libs/jquery.min',
        'materialize': 'libs/materialize.min',
        'socket': 'libs/socket.io',
        'message': 'src/socket'
    },

    shime: {
        'message': {
            deps: ['jquery', 'socket.io'],
            exports: 'socket'
        },      
        'materialize': {
            deps: ['jquery'],
            exports: 'materialize'
        }
        
    }
});

require(['jquery', 'message'], function($, message) {
    message.init();
})
