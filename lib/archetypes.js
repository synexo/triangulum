/*
Module: archetypes
*/

Archetype = function() {
    this.archetype = '';
    this.act = function() {};
    this.die = function() {};
    this.gen = function() {};

    this.init = function(obj, args) {
        if (typeof args === 'undefined') {
            obj.gen();
        }
        else {
            for (property in args) {
                if (args.hasOwnProperty(property)) {
                    obj[property] = args[property];
                };
            }
        };
    };

};

exports.Matter = function(args) {
    Archetype.apply(this, arguments);
    this.archetype = 'matter';

    this.decay = function(timePassed) {
        this.age = this.age + (timePassed/100);
    };

    this.act = function(timePassed) {
        this.decay(timePassed);
    };

    this.init(this, args);
};

// https://en.wikipedia.org/wiki/Stellar_classification
exports.Star = function(args) {
    Archetype.apply(this, arguments);
    this.archetype = 'star';

    var starClassData = [
        {'Class':'O', 'Temp':[30,100], 'Color':'deepblue', 'Mass':[16,100], 'Radius':[6.6,100], 'Lumin':[30,100], 'Per':0.01},
        {'Class':'B', 'Temp':[10,30], 'Color':'blue', 'Mass':[2.1,16], 'Radius':[1.8,6.6], 'Lumin':[25,30], 'Per':0.1},
        {'Class':'A', 'Temp':[7.5,10], 'Color':'bluewhite', 'Mass':[1.4,2.1], 'Radius':[1.4,1.8], 'Lumin':[5,25], 'Per':1},
        {'Class':'F', 'Temp':[6,7], 'Color':'white', 'Mass':[1.04,1.4], 'Radius':[1.15,1.4], 'Lumin':[1.5,5], 'Per':3},
        {'Class':'G', 'Temp':[5.2,6], 'Color':'yellow', 'Mass':[0.8,1.04], 'Radius':[0.96,1.15], 'Lumin':[0.6,1.5], 'Per':7},
        {'Class':'K', 'Temp':[3.7,5.2], 'Color':'orange', 'Mass':[0.45,0.8], 'Radius':[0.7,0.96], 'Lumin':[0.08,0.6], 'Per':12},
        {'Class':'M', 'Temp':[2.4,3.7], 'Color':'red', 'Mass':[0.08,0.45], 'Radius':[0.1,0.7], 'Lumin':[0.01,0.08], 'Per':76.89}
    ];

    this.gen = function() {
    };

    this.init(this, args);
};
