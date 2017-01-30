//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [];

var anims_on = [];
//make fill timing measures for each row that fire one after another
for (var i = 0; i < 13; i++) {
    var who = "R" + i;

    var anim = {
        who: who,
        name: "FLICKER",
        strips: [s1, s2],
        time_out: i * 1000,
        //params for animation
        color1: [0, 0, 0],
        color2: [1, 1, 1],
        fadelength: 2000,
    };
    anims_on.push(anim);
}

var anims_off = [];
//make fill timing measures for each row that fire one after another
for (var i = 0; i < 13; i++) {
    var who = "R" + (12 - i);

    var anim = {
        who: who,
        name: "FLICKER",
        strips: [s1, s2],
        time_out: i * 1000,
        //params for animation
        color1: [1, 1, 1],
        color2: [0, 0, 0],
        fadelength: 250,
    };
    anims_off.push(anim);
}

var measures = [{
    //===================================
    dur: 3000, //<- duration of this animation measure
    //-----------------------------------
    anims: anims_on,
    //===================================
}, {
    //===================================
    dur: 3000, //<- duration of this animation measure
    //-----------------------------------
    anims: anims_off,
    //===================================
}];

/*
//white for 10 sec
measures.push({
    //===================================
    dur: 500, //<- duration of this animation measure
    //-----------------------------------
    anims: [{
        who: "ALL",
        name: "FILL",
        strips: [s1, s2, t1, t2, c],
        //params for animation
        color: [1, 1, 1],
    }],
    //===================================
});
*/


module.exports = {
    measures: measures,

}