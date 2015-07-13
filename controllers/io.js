var getTime=function() {  
  	var date = new Date();  
  	return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();  
};

var ioCtr = function (io) {	
	var message = function(data) {
		io.emit('message_from_server', {
			user_name: data.user_name,
			time: getTime(),
			message: data.message
		});
	};

	io.on('connection', function(socket) {
        socket.on('message_from_client', function(data) {
        	message(data);
        });
	});
};

module.exports = ioCtr;