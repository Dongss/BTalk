var ioCtr = function (io) {
	var message = function(data) {
		console.log(data);
		socket.emit('message_from_server', data);
	}

	io.on('connection', function(socket) {
        socket.on('message_from_client', function(data) {
        	message(data);
        });
	});
}

module.exports = ioCtr;