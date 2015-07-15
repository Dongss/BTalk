require.config({
    paths: {
        'jquery': 'libs/jquery.min',
        'materialize': 'libs/materialize.min',
        'socket': 'libs/socket.io',
        'message': 'src/socket',
        'jquery-cookie': 'libs/jquery.cookie'
    },

    shime: {
        'message': {
            deps: ['jquery', 'socket.io', 'jquery-cookie'],
            exports: 'socket'
        },      
        'materialize': {
            deps: ['jquery'],
            exports: 'materialize'
        }
        
    }
});

require(['jquery', 'message', 'xss'], function($, message) {
    require(['materialize'], function(materialize) {
        $('.tooltipped').tooltip({delay: 20});
        message.init(materialize);
    }); 
});
