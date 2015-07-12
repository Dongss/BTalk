var ioCtr = function (io) {
	var changeName = function(newName) {
		console.log('on change name ')
		io.emit('change_name_success', newName);
	};

	io.on('connection', function(socket) {
		io.on('change_name', function(newName) {
			changeName(newName);
		});
	})
}

module.exports = ioCtr;