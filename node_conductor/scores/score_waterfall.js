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
            who: "ALL",
            name: "WATERFALL",
            strips: [s1, s2],
            //params for animation
            speed: 0.3,
            color1: [1, 1, 1],
            color2: [1, 1, 0],
            color3: [0.75, 0.5, 0],

        }, {
            who: "ALL",
            name: "WATERFALL",
            strips: [c],
            //params for animation
            speed: 0.1,
            color1: [1, 1, 1],
            color2: [0, 0, 0],
            color3: [0, 0, 0],

        }





    ],
    //===================================
}];

module.exports = {
    measures: measures,

}