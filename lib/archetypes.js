exports.matter = function matter() {
    this.archetype = 'matter';
    this.age = 0;

    this.decay = function(timePassed) {
        this.age = this.age + (timePassed/100);
    };

    this.act = function(timePassed) {
        this.decay(timePassed);
    };
};
