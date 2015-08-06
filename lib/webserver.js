/*
Module: webserver
*/
module.exports = function (book, now, express, api, http, io, sockets) {

    var updateReaders = function (sockets) {
        for (var s in sockets) {
            var socket = sockets[s];
            var reader = sockets[s].reader;

            for (var p in reader.viewPages) {
                var page = reader.viewPages[p];
                socket.emit('page', book[page]);
            };

        };
        setTimeout(updateReaders, 2000, sockets, io);
    };

    api.use(express.static('public'));

    io.on('connection', function(socket) {
        var connId = now();
        socket.connId = connId;
        socket.reader = {};
        sockets[connId] = socket;

        console.log('socket connection ' + socket.connId);

        socket.emit('connId', socket.connId);
        socket.emit('message', 'Welcome! ' + socket.connId);

        socket.on('myReader', function(msg) {
            console.log(JSON.stringify(msg));
            socket.reader = msg;
        });

        socket.on('disconnect', function() {
            delete sockets[socket.connId];
            console.log('socket disconnect ' + socket.connId);
        });
    });

    http.listen(8080, function() {
        console.log('listening on port 8080');
    });

    api.get('/api/', function (req, res) {
        res.json(book[req.query['page']]);
        console.log(req.query);
    });

    updateReaders(sockets);

    module.io = io;
    return module
};
