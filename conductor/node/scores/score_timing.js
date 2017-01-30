//NAME Abreviations 
var s1 = "STRIP1";
var s2 = "STRIP2";
var t1 = "TSTRIP1";
var t2 = "TSTRIP2";
var c = "CIRCLE";

var measures = [
    /*
        {
            //===================================
            dur: 2000, //<- duration of this animation measure
            //-----------------------------------
            anims: [{
                who: "ALL",
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [1, 1, 1],
            }],
            //===================================
        }, {
            //===================================
            dur: 2000, //<- duration of this animation measure
            //-----------------------------------
            anims: [{
                who: "ALL",
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [1, 0, 0],
            }],
            //===================================
        }, {
            //===================================
            dur: 2000, //<- duration of this animation measure
            //-----------------------------------
            anims: [{
                who: "ALL",
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [0, 1, 0],
            }],
            //===================================
        }, {
            //===================================
            dur: 2000, //<- duration of this animation measure
            //-----------------------------------
            anims: [{
                who: "ALL",
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [0, 0, 1],
            }],
            //===================================
        }, {
            //===================================
            dur: 2000, //<- duration of this animation measure
            //-----------------------------------
            anims: [{
                who: "ALL",
                name: "BLACK",
                strips: [s1, s2, t1, t2, c],
            }, {
                who: "TEST",
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [1, 1, 1],
                time_out: 2000,
            }],
            //===================================
        },
        */
];


function makeTimingMeasure(_who) {

    return {
        //===================================
        dur: 10, //<- duration of this animation measure
        //-----------------------------------
        anims: [

            {
                who: "ALL",
                name: "BLACK",
                strips: [s1, s2, t1, t2, c],
            },

            {
                who: _who,
                name: "FILL",
                strips: [s1, s2, t1, t2, c],
                //params for animation
                color: [1, 1, 1],
                time_out: 200,
            }
        ],
        //===================================
    }
}

//make fill timing measures for each row that fire one after another
for (var i = 0; i < 13; i++) {
    var who = "R" + i;
    var new_measure = makeTimingMeasure(who);
    measures.push(new_measure);
}

for (var i = 0; i < 13; i++) {
    var who = "R" + (12 - i);
    var new_measure = makeTimingMeasure(who);
    measures.push(new_measure);
}
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