//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [{
    //===================================
    dur: 2000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "FADE_IN_OUT",
        strips: [s1],
        //params for animation
        color_in: [1, 1, 1],
        time_in: 250,
        time_on: 1000,
        time_out: 750,
    }, {
        who: "ALL",
        name: "FADE_IN_OUT",
        strips: [c],
        offset: 100, //<- optional 100ms offset. this aniation will start 100ms after the block begins
        //params for animation
        color_in: [1, 0, 0],
        time_in: 500,
        time_on: 250,
        time_out: 500,
    }],
    //===================================
}, {
    //===================================
    dur: 15000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "BASIC_ANTS",
        strips: [s1, s2, s3],
        //params for animation
        color1: [1, 0, 0],
        coloALL: [0, 0, 0],
        speed: 25,
        time_in: 5000,
        time_on: 5000,
        time_out: 5000,
    }, {
        who: "R3",
        name: "FADE_IN_OUT",
        strips: [s1],
        offset: 2000,
        //params for animation
        color_in: [1, 0, 0],
        time_in: 500,
        time_on: 250,
        time_out: 500,
    }],
    //===================================
}, {
    //===================================
    dur: 2000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "BASIC_WIPE",
        strips: [s2, s3, c],
        //params for animation
        speed: 10
    }],
    //===================================
}, {
    //===================================
    dur: 3000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "BASIC_WIPE",
        strips: [s1, s2, t1, t2, c],
        //params for animation
        speed: 60,
        time_out: 3000,
    }],
    //===================================
}, ]

//forloop


module.exports = {
    measures: measures,

}