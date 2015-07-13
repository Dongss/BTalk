define(['jquery', 'socket', 'jquery-cookie'], function($, io) {
    var socket = io.connect('http://localhost:3000');

    var getName = function() {
        return ($.cookie('user_name'));
    };

    var initName = function() {
        if (!getName()) {
            // cookie 七天有效期
            $.cookie('user_name', ('游客' + parseInt((Math.random() * (999999 - 100000) + 100000))), {expires: 7});
        }
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
        console.log(data);
        $('#input-container').after(
            '<div class="row">'
            +  '<span class="blue-text">'
            + data.user_name + '&nbsp;&nbsp;&nbsp;' + data.time + '</span><br>' 
            + data.message + '</div>'
        );
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