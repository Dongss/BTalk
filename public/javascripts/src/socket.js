define(['jquery', 'socket'], function($, io) {
    var socket = io.connect('http://localhost:3000');
    var name = '游客' + parseInt((Math.random() * (999999 - 100000) + 100000));

    var getName = function() {
        console.log('=======================> socket !');
        console.log(this.name);
        console.log('<===============================');
    };

    var changeName = function(newName) {
        console.log("22223433")
        socket.emit('change_name', {name: '2323'});
        console.log(";=========")
        this.name = newName;
    };

    var changeNameSuccess = function(newName) {
        console.log('ON CHANGE NAME change_name_success')
    };

    var init = function() {
        socket.emit('change_name', {name: 'mvmv'});

        socket.on('welcome', function(data) {
            console.log(data)
            socket.emit('change_name', {name: 'wew'});
        })

        socket.on('change_name_success', function(newName) {
            changeNameSuccess(newName);
        });
    }

    return {
        name: name,
        getName: getName,
        changeName: changeName,
        init: init
    };
});