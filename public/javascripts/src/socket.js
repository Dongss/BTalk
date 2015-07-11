define(['jquery'], function($) {
    var getName = function() {
        console.log('=======================> socket !');
        console.log(this.name);
        console.log('<===============================');
    };

    var changeName = function(nameTarget) {
        this.name = nameTarget;
    }

    return {
        name: '游客',
        getName: getName,
        changeName: changeName
    };
});