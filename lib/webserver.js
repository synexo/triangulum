/*
Module: webserver
*/
module.exports = function (book) {

    var express = require("express");
    var api = express();
    api.use(express.static("public"));

    var http = require("http").Server(api);
    var io = require("socket.io")(http);

    io.on("connection", function(socket) {
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
