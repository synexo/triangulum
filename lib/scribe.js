var redis = require("redis");
var redisClient = redis.createClient(6379, '127.0.0.1');

function scribe(book, interval) {
    console.log('Saving');
    ws.io.sockets.emit('message', book[1]);

    redisSave = [];

    for (var page in book) {
        var data = JSON.stringify(book[page]);
        redisSave.push(page, data);
    };

    redisClient.mset(redisSave, function (err, res) {
        console.log('Saved');
        setTimeout(scribe, interval, book, interval);
    }.bind( {book: book, interval: interval} ));

};

module.exports = scribe;
