var config;
var animators;

var current_mode = "AUTO";

var scores = {};
var current_score;
var current_amb_score;

//stores the function pointer to the next timeout playing the next measure
var measure_timeout;
var lastplayedmeasure;

var isPlayingScore = false;


var autoModeOn = "ON";
var autoModeOff = "OFF";
var autoModeWhite = "White";

var autoMode = autoModeOn;


var hour_offset = -5;
// var hour_on = 16;
// var hour_white = 0;
// var hour_end = 7;

function checkTime() {

    //This code is all pretty nasty. A better engineered non hacked together solution should be created for scheduling. 

    var d = new Date();
    console.log("----------- Current Time -----------");
    console.log((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
    var hour = d.getHours() + hour_offset;

    if (hour < 0) {
        hour = hour + 24;
    }

    if (16 <= hour && hour < 18) {
        //WHITE1 4:00 to 6:00
        //autoMode = autoModeWhite;
        autoMode = autoModeOn;
    } else if (18 <= hour) {
        //ON
        autoMode = autoModeOn;
    } else if (hour <= 7) {
        //WHITE2 0:00 to 7:00 
        autoMode = autoModeWhite;
    } else {
        //OFF
        autoMode = autoModeOff;
    }


    /*
    if (hour >= hour_on) {
        //ON
        autoMode = autoModeOn;
    } else if (hour < hour_end) {
        //WHITE
        autoMode = autoModeWhite;
    } else {
        //OFF
        autoMode = autoModeOff;
    }
    */

    console.log("[[ hour : " + hour + " white1:" + 16 + " on:" + 18 + " white2:" + 0 + " off:" + 7 + " ]]");
    console.log("MODE <" + autoMode + ">");




    /*
    //console.log("current hour :" + hour + ":00 start at :" + hour_on + ":00 end at :" + hour_white + ":00");
    if (hour >= hour_on || hour < hour_white) {
        isTimeForLights = true || overide;
        console.log("SHOW TIME");
        //isTimeForLights = false;
    } else {
        isTimeForLights = false || overide;
        console.log("OFF TIME");
    }
    */

}
// function loadScores(_config) {
//     scores = {};
//     for (var s in _config.scores) {
//         var score = require(_config.scores[s]);
//         if (score) {
//             scores[s] = score;
//         }
//     }
// }



function init(_config, _animators) {
    config = _config;
    animators = _animators;

    checkTime();

    current_mode = config.startmode;
    setTimeout(function() {
        setMode(current_mode);
    }, config.bootwait);




    //loadScores(config);

    /*
        // var score_addr = config.score
        // score = require(score_addr);

        // var ambient_addr = config.ambient
        // ambient = require(ambient_addr);


        // var d = new Date();
        // d.setMinutes(d.getMinutes() + 30);
        // d.setMinutes(0);

        // console.log((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
        // var offset = new Date().getTimezoneOffset();
        // console.log(offset);

        // var seconds_to_next_minute = (60 - d.getSeconds());
        // var seconds_to_next_30sec = seconds_to_next_minute % 30;
        // console.log(seconds_to_next_minute);

        // console.log("Playing show every " + config.score_wait / (1000 * 60) + " min.");
        // console.log("Starting Idle in " + seconds_to_next_30sec + " sec.");

        // setTimeout(function() {
        //     idle_loop();
        // }, seconds_to_next_30sec * 1000);
        */

}

function getModes() {
    var modes = {
        "AUTO": "AUTO",
    }
    var scores = config.scores;
    for (var s in scores) {
        modes[s] = s;
    }
    return modes;
}

function getCurrentMode() {
    return current_mode;
}

function setMode(_mode) {
    current_mode = _mode;
    // //stop playing the previous score
    // clearTimeout(measure_timeout);

    console.log("<---" + _mode + "--->");

    if (_mode == "AUTO") {
        var show_score_path = config.scores["SHOW"];
        var amb_score_path = config.scores["AMB"];
        var white_score_path = config.scores["WHITE"];
        var off_score_path = config.scores["OFF"];

        if (show_score_path && amb_score_path && white_score_path && off_score_path) {

            var show_score = require(show_score_path);
            var amb_score = require(amb_score_path);
            var white_score = require(white_score_path);
            var off_score = require(off_score_path);

            if (show_score && amb_score) {
                console.log("mode set to : ", "AUTO");
                playAuto(show_score, amb_score, white_score, off_score); //, config.show_wait);
            }
        }
    } else {
        var score_path = config.scores[_mode];
        console.log(score_path);
        if (score_path) {
            var score = require(score_path);
            if (score) {
                console.log("mode set to : ", _mode);
                playScore(score);
            }

        }
    }

    current_score = scores
}


function playScore(score) {
    //stop playing the previous score
    clearTimeout(measure_timeout);

    console.log("playing score...");
    isPlayingScore = true;

    //clear all old animations that might be playing
    animators.writeToAnimators("ALL", "clear");

    function loop(i, dur) {
        if (dur) {
            measure_timeout = setTimeout(function() {
                playAnimMeasure(i);
            }, dur);
        }
    }


    function playAnimMeasure(i) {
        if (i < score.measures.length) {

            var measure = score.measures[i];
            lastplayedmeasure = measure;
            if (measure.dur) {
                console.log(i, measure.dur);
            } else {
                console.log(i, "loop");
            }

            measure.anims.forEach(function(anim) {
                animators.writeToAnimators(anim.who, "animate", anim);
            });
            //wait for the end of the measure and play the next set of animations
            loop((i + 1), measure.dur);

        } else {
            console.log("Show Finished. Starting over...");

            //DO A TIME CHECK HERE!!!

            playAnimMeasure(0);
        }
    }

    playAnimMeasure(0);
}

function playAuto(show_score, amb_score, white_score, off_score) {
    //stop playing the previous score
    clearTimeout(measure_timeout);

    console.log("playing Auto ...");
    isPlayingScore = true;

    var isPlayingShow = false; //if false it means it is playing the ambient
    var current_score = show_score;

    //clear all old animations that might be playing
    animators.writeToAnimators("ALL", "clear");

    function loop(i, dur) {
        if (dur) {
            measure_timeout = setTimeout(function() {
                playAnimMeasure(i);
            }, dur);
        }
    }


    function initScoreLoop() {
        //DO A TIME CHECK HERE!!!
        checkTime();
        //clear all old animations that might be playing
        animators.writeToAnimators("ALL", "clear");


        if (autoMode == autoModeOn) {
            //ON
            //swap between ambient and show
            if (isPlayingShow) {
                current_score = amb_score;
                console.log("Show Finished. Playing Ambient...");
            } else {
                current_score = show_score;
                console.log("Ambient Finished. Playing Show...");
            }
            isPlayingShow = !isPlayingShow;

        } else if (autoMode == autoModeWhite) {
            //WHITE
            current_score = white_score;
            console.log("Playing White...");

        } else if (autoMode == autoModeOff) {
            //OFF
            current_score = off_score;
            console.log("Playing Black...");

        }

        playAnimMeasure(0);
    }


    function playAnimMeasure(i) {
        if (i < current_score.measures.length) {

            var measure = current_score.measures[i];
            lastplayedmeasure = measure;
            if (measure.dur) {
                console.log(i, measure.dur);
            } else {
                console.log(i, "loop");
            }

            measure.anims.forEach(function(anim) {
                animators.writeToAnimators(anim.who, "animate", anim);
            });

            loop((i + 1), measure.dur);

        } else {
            initScoreLoop();
        }
    }



    //START THE ANIMATION
    initScoreLoop();

}

function onNewConnection(_address, name) {
    //console.log("<<New Connection>>");
    if (lastplayedmeasure && isPlayingScore) {
        console.log(">>>", name);

        lastplayedmeasure.anims.forEach(function(anim) {
            animators.catchUpAnimator(_address, anim.who, "animate", anim);
        });

        // if (isTimeForLights) {
        //     lastplayedmeasure.anims.forEach(function(anim) {
        //         animators.catchUpAnimator(_address, anim.who, "animate", anim);
        //     });
        // } else {
        //     //clear all old animations that might be playing
        //     animators.writeToAnimators(anim.who, "clear");
        // }
    }
}

function playAnimation(_who, _name, _strips) {
    console.log("playing " + _name + " on " + _who + "...");

    //clear all old animations that might be playing
    //animators.writeToAnimators(_who, "clear");
    var anim = {
        who: _who,
        name: _name,
        strips: _strips,
    }
    animators.writeToAnimators(anim.who, "animate", anim);
}


module.exports = {
    init: init,
    getModes: getModes,
    getCurrentMode: getCurrentMode,
    setMode: setMode,
    playAnimation: playAnimation,
    onNewConnection: onNewConnection,

}