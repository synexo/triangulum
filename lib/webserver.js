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

        socket.broadcast.emit('message', 'New Connection');

        socket.reader = {};
        sockets[socket.id] = socket;

        console.log('socket connection ' + socket.id);

        socket.emit('id', socket.id);
        socket.emit('message', 'Welcome! ' + socket.id);

        socket.on('myReader', function(msg) {
            console.log(JSON.stringify(msg));
            socket.reader = msg;
        });

        socket.on('disconnect', function() {
            delete sockets[socket.id];
            console.log('socket disconnect ' + socket.id);
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
