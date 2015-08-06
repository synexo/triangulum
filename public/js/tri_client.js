function reader() {
    this.viewPages = [];
    this.viewPages.push('1');
    this.viewPages.push('2');
};

myReader = new reader();


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

socket.on('page', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('connId', function (msg) {
    myReader.connId = msg;
});

setInterval( function () {socket.emit('myReader', myReader);}, 1000);
