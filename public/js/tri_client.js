function viewer() {
    this.sectors = [];
    this.sectors.push({"x": 0, "y": 0});
};

view = new viewer();


var socket = io();

socket.on('connect', function (msg) {
    console.log('connected');
});

socket.on('disconnect', function (msg) {
    console.log('disconnected');
});

socket.on('message', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('sector', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('id', function (msg) {
    view.id = msg;
});

setInterval( function () {socket.emit('view', view);}, 1000);
