var moment = require('moment');
var users = {};

var getTime = function() { 
  	return  moment().tz('Asia/Shanghai').format('HH:mm:ss');
};

var hasName = function(name) {
	for (var i in users) {
		if (users[i] === name) {
			return true;
		}
	}
	return false;
}

var setName = function(oldName, newName, id) {
    for (var i in users) {
        if (users[i] === oldName) {
            delete users[i];
        }
    }

    users[id] = newName;
}

var ioCtr = function (io) {
    var onConnect = function(data, id) {
    	users[id] = data.user_name;

    	io.emit('message_from_server', {
    		user_name: users[id],
    		time: getTime(),
    		message: ' 加入群聊',
    		type: 'SYSTEM',
    		users: users
    	});
    };

    var onDisconnect = function(id) { 
        var name = 	users[id];
        delete users[id];

    	io.emit('message_from_server', {
    		user_name: name,
    		time: getTime(),
    		message: ' 退出群聊',
    		type: 'SYSTEM',
    		users: users
    	}); 	
    };

	var message = function(data, id) {
		io.emit('message_from_server', {
			user_name: users[id],
			time: getTime(),
			message: data.message,
			type: 'MESSAGE'
		});
	};

    var changeName = function(data, id) {
        if (hasName(data.newName)) {
            socket.emit('change_name_res', {
                retCode: -1,
                message: '天涯何处无芳草，此名已经存在了'
            });
        } else {
            setName(data.oldName, data.newName, id);

            io.emit('change_name_res', {
                retCode: 0,
                newName: data.newName,
                oldName: data.oldName
            });

            io.emit('message_from_server', {
                user_name: data.newName,
                time: getTime(),
                message: ' 修改昵称',
                type: 'SYSTEM',
                users: users
            })
        }
    }

	io.on('connection', function(socket) {
	    socket.on('message_from_client', function(data) {
        	message(data, socket.id);
        });

        socket.on('client_connect', function(data) {
        	onConnect(data, socket.id);
        });

        socket.on('change_name', function(data) {
            changeName(data, socket.id);
        });

        socket.on('disconnect', function() {
        	onDisconnect(socket.id);
        });
	});
};

module.exports = ioCtr;