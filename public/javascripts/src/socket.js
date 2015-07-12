define(['jquery', 'socket'], function($, io) {
    var socket = io.connect('http://localhost:3000');

    var getName = function() {
        console.log('=======================> socket !');
        console.log(this.name);
        console.log('<===============================');
    };

    var changeName = function(newName) {
        socket.emit('change_name', newName);
        this.name = newName;
    };

    var changeNameSuccess = function(newName) {
        console.log('ON CHANGE NAME change_name_success')
    };

    var init = function() {
        socket.on('change_name_success', function(newName) {
            changeNameSuccess(newName);
        });
    }

    return {
        name: '游客',
        getName: getName,
        changeName: changeName,
        init: init
    };
});