//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [{
    //===================================
    //dur: 2000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
            who: "R1",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R2",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R3",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R4",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R5",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R6",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,

        }, {
            who: "R7",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,

        }, {
            who: "R8",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R9",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R10",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "R11",
            name: "CHASER",
            strips: [s1, s2],
            //params for animation

            color1: [1, 1, 1],
            color2: [0, 1, 1],

            speed: 4,
            minsize: 1,
            maxsize: 20,

            spawnrate: 0.02,
        }, {
            who: "ALL",
            name: "FILL",
            strips: [t1, t2, c],
            //params for animation
            color: [0, 1, 1],
        },


    ],
    //===================================
}];

module.exports = {
    measures: measures,

}