/*
Module: webserver
*/
module.exports = function (now, express, api, http, io, sockets, sectors) {

    var updateReaders = function (sockets) {
        for (var s in sockets) {
            var socket = sockets[s];
            var view = socket.view;

            for (var vs in view.sectors) {
                var vSector = view.sectors[vs];
                var sector = sectors[vSector.x][vSector.y];
                socket.emit('sector', sector);
            };

        };
        setTimeout(updateReaders, 2000, sockets, io);
    };

    api.use(express.static('public'));

    io.on('connection', function(socket) {

        socket.broadcast.emit('message', 'New Connection');

        socket.viewer = {};
        sockets[socket.id] = socket;

        console.log('socket connection ' + socket.id);

        socket.emit('id', socket.id);
        socket.emit('message', 'Welcome! ' + socket.id);

        socket.on('view', function(msg) {
            console.log(JSON.stringify(msg));
            socket.view = msg;
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
        var sector = sectors[req.query.x][req.query.y];
        res.json(sector);
        console.log(req.query);
    });

    updateReaders(sockets);

    module = this;
    return module
};
