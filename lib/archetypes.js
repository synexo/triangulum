/*
Module: archetypes
*/

Archetype = function() {
    this.archetype = '';
    this.act = function() {};
    this.die = function() {};
};

exports.Matter = function() {
    Archetype.apply(this, arguments);

    this.archetype = 'matter';
    this.age = 0;

    this.decay = function(timePassed) {
        this.age = this.age + (timePassed/100);
    };

    this.act = function(timePassed) {
        this.decay(timePassed);
    };
};

// https://en.wikipedia.org/wiki/Stellar_classification
exports.Star = function(args) {
    Archetype.apply(this, arguments);
    this.archetype = 'star'

    if (typeof args === 'undefined') {
    }
    else {
        for (property in args) {
            if (args.hasOwnProperty(property)) {
                this[property] = args[property];
            };
        }
    };
    
};
