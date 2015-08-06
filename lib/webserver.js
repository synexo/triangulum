/*
Module: webserver
*/
module.exports = function (book, now, express, api, http, io, readers) {

    var updateReaders = function (readers) {
        for (var r in readers) {
            readers[r].emit('message', readers[r].connectionID);
            readers[r].emit('message', book[readers[r].requestPage]);
        };
        setTimeout(updateReaders, 2000, readers, io);
    };

    api.use(express.static('public'));

    io.on('connection', function(socket) {
        var connectionID = now();
        socket.connectionID = connectionID;
        readers[socket.connectionID] = socket;

        console.log('socket connection ' + socket.connectionID);

        socket.emit('message', 'Welcome! ' + socket.connectionID);

        socket.on('message', function(msg) {
            console.log(msg);

            if (msg.hasOwnProperty('page')) {
                socket.requestPage = msg.page;
                console.log('requestPage', msg.page);
            };

        });

        socket.on('disconnect', function() {
            delete readers[socket.connectionID];
            console.log('socket disconnect ' + socket.connectionID);
        });
    });

    http.listen(8080, function() {
        console.log('listening on port 8080');
    });

    api.get('/api/', function (req, res) {
        res.json(book[req.query['page']]);
        console.log(req.query);
    });

    updateReaders(readers);

    module.io = io;
    return module
};
