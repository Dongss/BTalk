var moment = require('moment');
var users = {};

var getTime = function() { 
  	return  moment().format('HH:mm:ss');
};

var hasName = function(name) {
	for (var i in users) {
		if (users[i] === name) {
			return true;
		}
	}
	return false;
}

var getUsers = function() {
	var _users = [];
	for (var i in users) {
		if (users[i])
	}
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

	io.on('connection', function(socket) {
	    socket.on('message_from_client', function(data) {
        	message(data, socket.id);
        });

        socket.on('client_connect', function(data) {
        	onConnect(data, socket.id);
        });

        socket.on('disconnect', function() {
        	onDisconnect(socket.id);
        });
	});
};

module.exports = ioCtr;