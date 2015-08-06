#!/usr/bin/node
var numPages = 10000;
var numGlyphs = 5;
var book = [];
var readers = {};

var now = require('performance-now');

var redis = require('redis');
var redisClient = redis.createClient(6379, '127.0.0.1');

var express = require('express');
var api = express();
var http = require('http').Server(api);
var io = require('socket.io')(http);

var arc = require('./lib/archetypes.js');
var ws = require('./lib/webserver.js')(book, now, express, api, http, io, readers);
var scribe = require('./lib/scribe.js')(redisClient);

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
        console.log('time', startNow, 'timePassed', timePassed, 'latency', latency, 'execTime', execTime, 'timeOut', timeOut);
    };

    setTimeout(flip, timeOut, book, interval, startNow);
};

function page() {
    this.glyphs = [];
    this.scry = function(timePassed) {
        for (var glyph in this.glyphs) {
            this.glyphs[glyph].act(timePassed);
        };
    };
};


function main(book) {
    for (var i=0; i<numPages; i++) {
        var testPage = new page();
        for (var o=0; o<numGlyphs; o++) {
            var testGlyph = new arc.matter();
            testPage.glyphs.push(testGlyph);
        };
        book.push(testPage);
    };
    flip(book, 50, 0);
    scribe(book, 10000);
};

shelf = main(book);
//process.exit();
