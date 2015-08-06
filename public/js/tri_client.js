function reader() {
    this.viewPages = [];
    this.viewPages.push('1');
};

myReader = new reader();


var socket = io();

socket.on('message', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('connId', function (msg) {
    myReader.connId = msg;
});

setInterval( function () {socket.emit('myReader', myReader);}, 1000);
