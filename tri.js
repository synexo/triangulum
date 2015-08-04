#!/usr/bin/node
var numPages = 10000;
var numGlyphs = 5;

ws = require("./lib/webserver.js");
var arc = require("./lib/archetypes.js");
var scribe = require("./lib/scribe.js");

var now = require("performance-now");

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
            var testGlyph = new arc.matter();
            testPage.glyphs.push(testGlyph);
        };
        book.push(testPage);
    };
    flip(book, 50, 0);
    scribe(book, 10000);
};

shelf = new main();

//process.exit();
