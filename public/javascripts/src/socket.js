define(['jquery', 'socket'], function($, io) {
    var socket = io.connect('http://localhost:3000');
    var name = '游客' + parseInt((Math.random() * (999999 - 100000) + 100000));

    var message = function(data) {
        console.log(data);
    };

    var init = function() {
        socket.on('message_from_server', function(data) {
            message(data);
        });
    };

    return {
        name: name,
        init: init
    };
});