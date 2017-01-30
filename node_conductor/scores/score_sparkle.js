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
        name: "SPARKLE",
        strips: [s1, s2, t1, t2, c],
        //params for animation
    }],
    //===================================
}];

module.exports = {
    measures: measures,

}