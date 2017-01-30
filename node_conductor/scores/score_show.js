//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";



var anims_fill_on = [];
//make fill timing measures for each row that fire one after another
for (var i = 0; i < 13; i++) {
    var who = "R" + i;

    var anim = {
        who: who,
        name: "FILL",
        strips: [s1, s2],
        time_out: i * 250,
        //params for animation
        color: [1, 1, 1],
    };
    anims_fill_on.push(anim);
}

var anims_fill_off = [];
//make fill timing measures for each row that fire one after another
for (var i = 0; i < 13; i++) {
    var who = "R" + (12 - i);

    var anim = {
        who: who,
        name: "FILL",
        strips: [s1, s2],
        time_out: i * 250,
        //params for animation
        color: [0, 0, 0],
    };
    anims_fill_off.push(anim);
}


var measures = [{
        //===================================
        dur: 5000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "FOUNTAIN",
            strips: [s1, s2],
            //params for animation
        }],
        //===================================
    }, {

        //===================================
        dur: 3500, //<- duration of this animation measure
        //-----------------------------------
        anims: anims_fill_on,
        //===================================
    }, {
        //===================================
        dur: 3500, //<- duration of this animation measure
        //-----------------------------------
        anims: anims_fill_off,
        //===================================
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "BLACK",
            strips: [s1, s2],
            //params for animation
        }, {
            who: "ALL",
            name: "RAINBOW",
            strips: [t1, t2, c],
            //params for animation
        }],
        //===================================
    }, {
        //===================================
        dur: 30000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "BLACK",
            strips: [s1, s2],
            //params for animation
        }, {
            who: "ALL",
            name: "BOUNCE",
            strips: [t1, t2, c],
            //params for animation
            size: 1,
        }],
        //===================================
    }, {
        //===================================
        dur: 20000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "BOUNCE",
            strips: [s1, s2, t1, t2, c],
            //params for animation
        }],
        //===================================
    }, {
        //===================================
        dur: 30000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "SPARKLE",
            strips: [s1, s2],
            //params for animation
        }, {
            who: "ALL",
            name: "BLACK",
            strips: [t1, t2, c],
            //params for animation
        }],
        //===================================
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "WATERLEVEL",
            strips: [s1, s2],
            //params for animation
        }, {
            who: "ALL",
            name: "FILL",
            strips: [t1, t2, c],
            //params for animation
            color: [0, 0, 1],
        }],
        //===================================
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "TICK",
            strips: [c],
            //params for animation
            size: 1,
        }, {
            who: "ALL",
            name: "TICK",
            strips: [t1, t2],
            //params for animation
            size: 1,
        }, {
            who: "ALL",
            name: "FILL",
            strips: [s1, s2],
            //params for animation
            color: [0, 0, 1],
        }],
        //===================================
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "WIPE",
            strips: [s1, s2, c, t1, t2],
            //params for animation
            colors: [
                [1, 0, 0],
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ]
        }],
        //===================================
    }, {
        //===================================
        dur: 15000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }],
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "BLACK",
            strips: [s1, s2],
            //params for animation
        }, {
            who: "ALL",
            name: "RAINBOW",
            strips: [t1, t2, c],
            //params for animation
        }],
        //===================================
    }, {
        //===================================
        dur: 10000, //<- duration of this animation measure
        //-----------------------------------
        anims: [{
            who: "ALL",
            name: "RAINBOW",
            strips: [s1, s2, t1, t2, c],
            //params for animation
        }],
        //===================================
    },
    //===================================
];

module.exports = {
    measures: measures,

}