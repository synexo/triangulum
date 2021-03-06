/*
Module: scribe
*/
module.exports = function (redisClient) {

    var scribe = function (book, interval) {
        console.log('Saving');

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

    module = scribe;
    return module;
};
