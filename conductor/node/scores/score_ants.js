//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var anims1 = [];

for (var i = 0; i < 13; i++) {
    var who = "R" + i;
    var new_measure = {
        who: "ALL",
        name: "BASIC_ANTS",
        strips: [s1, s2],
        //params for animation
        speed: Math.floor(Math.random() * 50 + 1),
        color1: [1, 0, 0],
        color2: [0, 0, 0],

    };
    anims1.push(new_measure);
}
anims1.push({
    who: "ALL",
    name: "BASIC_ANTS",
    strips: [t1, t2],
    //params for animation
    speed: -15,
    color1: [1, 1, 0],
    color2: [0, 0, 0],

});


var measures = [{
    //===================================
    //dur: 2000, //<- duration of this animation measure
    //-----------------------------------
    anims: anims1,
    //===================================
}];

module.exports = {
    measures: measures,

}