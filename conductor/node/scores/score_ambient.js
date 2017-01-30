//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [{
    //===================================
    dur: 120000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "WEATHER",
        strips: [s1, s2],
        //params for animation
        //color: [1, 1, 1],
    }, {
        who: "ALL",
        name: "WEATHER_TEMP",
        strips: [c, t1, t2],
    }],
    //===================================
}, {
    //===================================
    dur: 120000, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "WEATHER",
        strips: [s1, s2],
        //params for animation
        //color: [1, 1, 1],
    }, {
        who: "ALL",
        name: "WEATHER_TEMP",
        strips: [c, t1, t2],
    }],
    //===================================
}];

module.exports = {
    measures: measures,

}