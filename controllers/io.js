var ioCtr = function (io) {
	var changeName = function(newName) {
		console.log('on change name ')
		io.emit('change_name_success', newName);
	};

	io.on('connection', function(socket) {
		console.log('connection');
		io.emit('welcome', 'welcome ');

		io.on('change_name', function(newName) {
			console.log(newName);
			//changeName(newName);
		});
	});
}

module.exports = ioCtr;