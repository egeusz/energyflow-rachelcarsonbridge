//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [{
    //===================================
    dur: 5000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "WIPE",
        strips: [s1, s2, c],
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
    dur: 5000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "WIPE",
        strips: [c],
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
    dur: 5000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "WIPE",
        strips: [t1, t2],
        //params for animation
        colors: [
            [1, 0, 0],
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]
    }],
    //===================================
}];

module.exports = {
    measures: measures,

}