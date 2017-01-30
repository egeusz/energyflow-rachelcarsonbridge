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
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 1,
            size: 1,

        }, {
            who: "R2",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 3,
            size: 5,

        }, {
            who: "R2",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 6,
            size: 12,

        }, {
            who: "R3",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 1,
            size: 1,
        }, {
            who: "R3",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 0.6,
            size: 1,

        }, {
            who: "R5",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 6,
            size: 12,

        }, {
            who: "R6",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 0.5,
            size: 1,

        }, {
            who: "R7",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: -1,
            size: 1,

        }, {
            who: "R8",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 6,
            size: 12,

        }, {
            who: "R9",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: -6,
            size: 12,

        }, {
            who: "R10",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: 3,
            size: 5,

        }, {
            who: "R11",
            name: "BOUNCE",
            strips: [s1, s2],
            //params for animation

            color: [1, 0, 0],

            speed: -3,
            size: 5,

        }, {
            who: "ALL",
            name: "FILL",
            strips: [t1, t2, c],
            //params for animation
            color: [1, 0, 0],
        },


    ],
    //===================================
}];

module.exports = {
    measures: measures,

}