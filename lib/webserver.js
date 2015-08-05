/*
Module: webserver
*/
module.exports = function (book, express, api, http, io, sockets) {

    api.use(express.static("public"));

    io.on("connection", function(socket) {
        sockets.push(socket);
        console.log('socket connection');
        socket.emit('message', 'Welcome!');
        socket.on("disconnect", function() {
            console.log("socket disconnection");
        });
    });

    http.listen(8080, function() {
        console.log("listening on port 8080");
    });

    api.get('/api/', function (req, res) {
        res.json(book[req.query['page']]);
        console.log(req.query);
    });

    module.io = io;
    return module
};
