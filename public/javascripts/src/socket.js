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

    var setName = function(name) {
        $.cookie('user_name', name)
    };

    var inputListener = function() {
        $('#input').keydown(function(e) { 
            if (e.keyCode === 13) {         
                socket.emit('message_from_client', {
                    user_name: getName(),
                    message: $(this).val()
                }) ;
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

            var htmlUsers = '';
            var allUsers = [];
            var usersNum = 0;

            for (var i in data.users) {
                allUsers.push(data.users[i]);
            }

            // 去重
            $.unique(allUsers);   

            for (var i in allUsers) {
                htmlUsers = htmlUsers + '<i class="mdi-image-timer-auto">-</i>' + allUsers[i] + '<br>';
                usersNum ++;
            }

            $('#users_num').html('<i class="mdi-social-people"></i>当前在线 （' + usersNum + '）');
            $('#users').html(htmlUsers);
        }

        $('.chat-box').prepend(html);
    }

    var initNickName = function() {
        $('#nick-name').html(
            '<span class="tooltipped" id="change-name-btn" data-position="right" data-tooltip="点击修改"> 昵称：'
            + getName() + '</span>');

        $('.tooltipped').tooltip({delay: 20});

        $('#change-name-btn').click(function(event) {
            changeName();
        });
    };

    var changeName = function(){
        $('#nick-name').html(
            '<input placeholder="输入昵称" type="text" class="validate" id="new-name">'
            + '<a class="waves-effect waves-teal btn-flat" id="change-yes">确认</a>'
            + '<a class="waves-effect waves-teal btn-flat" id="change-no">取消</a>'
        );

        $('#change-no').click(function(event) {
            initNickName();
        });

        $('#change-yes').click(function(event) {
            onChangeName($('#new-name').val());
        });
    };

    var onChangeName = function(newName) {
        if (newName === "" || newName.length > 10) {
            alert('0-10个字符，别闹', 3000);
        } else {
            socket.emit('change_name', {
                oldName: getName(),
                newName: newName
            });
        }
    };

    var changeNameDone = function(data) {
        if (data.oldName === getName()) {
            if (data.retCode === 0) {
                setName(data.newName);
                initNickName(data.newName);
            } else {
                alert(data.message);
                initNickName();
            }
        }
    }

    var init = function() {
        // 初始化用昵称
        initName();
        // 初始化昵称显示
        initNickName();
        // 监听输入
        inputListener();
        // 收到来自服务器的消息
        socket.on('message_from_server', function(data) {
            onMessage(data);
        });
        // 修改昵称完成
        socket.on('change_name_res', function(data) {
            changeNameDone(data);
        })
    };

    return {
        init: init
    };
});