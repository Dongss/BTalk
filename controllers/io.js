var moment = require('moment');

var getTime=function() { 
  	return  moment().format('HH:mm:ss');
};

var ioCtr = function (io) {
    var onConnect = function(data) {
    	io.emit('message_from_server', {
    		user_name: data.user_name,
    		time: getTime(),
    		message: ' 加入群聊',
    		type: 'SYSTEM'
    	});
    };

	var message = function(data) {
		io.emit('message_from_server', {
			user_name: data.user_name,
			time: getTime(),
			message: data.message,
			type: 'MESSAGE'
		});
	};

	io.on('connection', function(socket) {
	    socket.on('message_from_client', function(data) {
        	message(data);
        });

        socket.on('client_connect', function(data) {
        	onConnect(data);
        })
	});
};

module.exports = ioCtr;