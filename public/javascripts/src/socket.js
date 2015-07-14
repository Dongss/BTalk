define(['jquery', 'socket', 'jquery-cookie'], function($, io) {
    var socket = io.connect('http://localhost:3000');

    var getName = function() {
        return ($.cookie('user_name'));
    };

    var initName = function() {
        if (!getName()) {
            // cookie 七天有效期
            $.cookie('user_name', ('游客' + parseInt((Math.random() * (99999999 - 10000000) + 10000000))), {expires: 7});
        }

        socket.emit('client_connect', {user_name: getName()})
    };

    var inputListener = function() {
        $('#input').keydown(function(e) { 
            if (e.keyCode === 13) {
                var msg = {
                    user_name: getName(),
                    message: $(this).val()
                }; 

                socket.emit('message_from_client', msg) ;
                $(this).val('');
            } 
        });
    };

    var onMessage = function(data) {
        var html = '<div class="row';

        if (data.type === 'MESSAGE') {
            if (data.user_name === getName()) {
                html = html + ' self-message">'
                    + data.message + '<i class="mdi-hardware-keyboard-return teal-text">'
                    + data.time + '&nbsp' + data.user_name + '</i>'
                    + '</div>';
            } else {
                html = html + '">'
                    +  '<span class="blue-text">'
                    + data.user_name + '&nbsp;&nbsp;&nbsp;' + data.time + '</span><br>' 
                    + data.message + '</div>';
            }
        } else if (data.type === 'SYSTEM') {
            html = html + 'grey lighten-3">'
                + '<i class="mdi-av-volume-up orange-text lighten-1">系统通知：</i>'
                + '<span class="blue-text">' + data.user_name + '</span>' + data.message
                + '</div>';
        }

        $('.chat-box').prepend(html);
    }

    var init = function() {
        // 初始化昵称
        initName();
        // 监听输入
        inputListener();
        // 收到来自服务器的消息
        socket.on('message_from_server', function(data) {
            onMessage(data);
        });
    };

    return {
        init: init
    };
});