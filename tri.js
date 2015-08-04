#!/usr/bin/node
var numPages = 10000;
var numGlyphs = 5;

var now = require("performance-now");

var redis = require("redis");
var redisClient = redis.createClient(6379, '127.0.0.1');

var api = require("express")();
var http = require("http").Server(api);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
    console.log('socket connection');
    socket.on("disconnect", function() {
        console.log("socket disconnection");
    });
});


http.listen(8080, function() {
    console.log("listening on port 8080");
});

api.get('/api/', function (req, res) {
    res.send(shelf.book[req.query['page']]);
    console.log(req.query);
});

function flip(book, interval, lastNow) {
    var startNow = now();
    var timePassed = startNow - lastNow;
    var latency = timePassed - interval;
    if (latency < 0) {latency = 0};
   
    for (var page in book) {
        book[page].scry(timePassed);
    };

    var endNow = now();
    var execTime = endNow - startNow;
    var timeOut = interval - execTime - latency;
    if (timeOut < 0) {
        timeOut = 0;
        console.log("time", startNow, "timePassed", timePassed, "latency", latency, "execTime", execTime, "timeOut", timeOut);
    };

    setTimeout(flip, timeOut, book, interval, startNow);
};


function scribe(book, interval) {
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

function matter() {
    this.archetype = 'matter';
    this.age = 0;

    this.decay = function(timePassed) {
        this.age = this.age + (timePassed/100);
    };

    this.act = function(timePassed) {
        this.decay(timePassed);
    };
};

function page() {
    this.glyphs = [];
    this.scry = function(timePassed) {
        for (var glyph in this.glyphs) {
            this.glyphs[glyph].act(timePassed);
        };
    };
};

function main() {
    var book = [];
    this.book = book;
    for (var i=0; i<numPages; i++) {
        var testPage = new page();
        for (var o=0; o<numGlyphs; o++) {
            var testGlyph = new matter();
            testPage.glyphs.push(testGlyph);
        };
        book.push(testPage);
    };
    flip(book, 50, 0);
    scribe(book, 10000);
};

var shelf = new main();

//process.exit();
