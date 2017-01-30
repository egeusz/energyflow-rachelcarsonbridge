var Color = require('./color.js').Color;
var PixelArray = require('./pixelarray.js').PixelArray;

//---------------------------------------------------
//imported animations
var animations = {};

//** TO DO **
//** Use file system to auto load all aniamtions in the anim folder**//
//---------------------------------------------------
var anim_amb_throb = require('./anim/anim_amb_throb.js');
animations[anim_amb_throb.Name] = anim_amb_throb.Anim;
//---------------------------------------------------

//---------------------------------------------------
var anim_amb_weather = require('./anim/anim_amb_weather.js');
animations[anim_amb_weather.Name] = anim_amb_weather.Anim;
//---------------------------------------------------
var anim_amb_weathertemp = require('./anim/anim_amb_weathertemp.js');
animations[anim_amb_weathertemp.Name] = anim_amb_weathertemp.Anim;
//---------------------------------------------------

var anim_basic_wipe = require('./anim/anim_wipe.js');
animations[anim_basic_wipe.Name] = anim_basic_wipe.Anim;
//--------------------------------------------
var anim_basic_ants = require('./anim/anim_ants.js');
animations[anim_basic_ants.Name] = anim_basic_ants.Anim;
//--------------------------------------------
var anim_basic_black = require('./anim/anim_basic_black.js');
animations[anim_basic_black.Name] = anim_basic_black.Anim;
//--------------------------------------------
var anim_bounce = require('./anim/anim_bounce.js');
animations[anim_bounce.Name] = anim_bounce.Anim;
//--------------------------------------------
var anim_chaser = require('./anim/anim_chaser.js');
animations[anim_chaser.Name] = anim_chaser.Anim;
//--------------------------------------------
var anim_equalizer = require('./anim/anim_equalizer.js');
animations[anim_equalizer.Name] = anim_equalizer.Anim;
//--------------------------------------------
var anim_fadeinout = require('./anim/anim_fadeinout.js');
animations[anim_fadeinout.Name] = anim_fadeinout.Anim;
//--------------------------------------------
var anim_fountain_up = require('./anim/anim_fountain.js');
animations[anim_fountain_up.Name] = anim_fountain_up.Anim;
//--------------------------------------------
var anim_rain = require('./anim/anim_rain.js');
animations[anim_rain.Name] = anim_rain.Anim;
//--------------------------------------------
var anim_rain = require('./anim/anim_rainbow.js');
animations[anim_rain.Name] = anim_rain.Anim;
//--------------------------------------------
var anim_sparkle = require('./anim/anim_sparkle.js');
animations[anim_sparkle.Name] = anim_sparkle.Anim;
//--------------------------------------------
var anim_weep = require('./anim/anim_weep.js');
animations[anim_weep.Name] = anim_weep.Anim;
//--------------------------------------------
var anim_fill = require('./anim/anim_fill.js');
animations[anim_fill.Name] = anim_fill.Anim;
//--------------------------------------------
var anim_waterfall = require('./anim/anim_waterfall.js');
animations[anim_waterfall.Name] = anim_waterfall.Anim;
//--------------------------------------------
var anim_waterfall = require('./anim/anim_waterlevel.js');
animations[anim_waterfall.Name] = anim_waterfall.Anim;
//--------------------------------------------
var anim_flicker = require('./anim/anim_flicker.js');
animations[anim_flicker.Name] = anim_flicker.Anim;
//--------------------------------------------
var anim_runner = require('./anim/anim_runner.js');
animations[anim_runner.Name] = anim_runner.Anim;
//--------------------------------------------
var anim_tick = require('./anim/anim_tick.js');
animations[anim_tick.Name] = anim_tick.Anim;


//---------------------------------------------------


//what the strip structure will look like
// var strip1 = {
// 		length:780,
// 		animationStack:[],
//      write_index: 0,
// }
var strip1;
var strip2;
var circle;
var tstrip1;
var tstrip2;

var strips = {};

//the maximum length of a single strip
var max_run_length = 130;
var total_length = 50;
var colorbuffer;
var hexbuffer;

function checkLength(_length) {
    if (_length) {
        var length = Math.floor(_length); //force to int if it was a float
        if (!length) {
            console.error("ERROR: animationControl(): no length specified or length is not a number : ", _length);
            return null;
        } else {
            return length;
        }
    }
    return null;
}

function init(_lengths) {

    //1xxxxxxxxxxxxxCxxxxxxx <strip 1 <circle
    //2xxxxxxxxxxxxx-------- <strip 2
    //3---------------------
    //4---------------------
    //5xxxxxxxxxx----------- <tstrip1
    //6xxxxxxxxxx----------- <tstrip2
    //7---------------------
    //8---------------------


    //parse lengths
    //_lengths looks like this:
    // var lengths = {	
    //     maxrun: 780,
    //	   strip1: 554,
    //     circle: 54,
    //     strip2: 60,
    //     tstrip1: 60,
    // }
    //--Max Run Length
    var lengths_maxrun = checkLength(_lengths.maxrun);
    if (lengths_maxrun) {
        max_run_length = lengths_maxrun;
    }
    total_length = max_run_length * 8; //8 is the max number of strips
    //--Strip 1
    var lengths_strip1 = checkLength(_lengths.strip1);
    if (lengths_strip1) {
        strip1 = {
            name: "STRIP1",
            length: lengths_strip1,
            animationStack: [],
            write_index: 1,
        }
        strips["STRIP1"] = strip1;

    } else {
        //if no strip1, but we need zero for the circle to reference.
        lengths_strip1 = 0;
    }
    //--Circle
    var lengths_circle = checkLength(_lengths.circle);
    if (lengths_circle) {

        //check for offset
        var circle_offset = 0;
        if (_lengths.circle_offset) {
            circle_offset = _lengths.circle_offset;
        }

        circle = {
            name: "CIRCLE",
            length: lengths_circle,
            animationStack: [],
            //write_index: lengths_strip1,
            write_index: lengths_strip1 + 1 + circle_offset,
        }
        strips["CIRCLE"] = circle;
    }
    //--Strip 2
    var lengths_strip2 = checkLength(_lengths.strip2);
    if (lengths_strip2) {
        strip2 = {
            name: "STRIP2",
            length: lengths_strip2,
            animationStack: [],
            write_index: max_run_length + 1,
            //write_index: max_run_length + 1,
        }
        strips["STRIP2"] = strip2;
    }
    //--T Strip 1
    var lengths_tstrip1 = checkLength(_lengths.tstrip1);
    if (lengths_tstrip1) {
        tstrip1 = {
            name: "TSTRIP1",
            length: lengths_tstrip1,
            animationStack: [],
            write_index: (4 * max_run_length) + 1,
        }
        strips["TSTRIP1"] = tstrip1;
    }

    //--T Strip 2
    var lengths_tstrip2 = checkLength(_lengths.tstrip2);
    if (lengths_tstrip2) {
        tstrip2 = {
            name: "TSTRIP2",
            length: lengths_tstrip2,
            animationStack: [],
            write_index: (5 * max_run_length) + 1,
        }
        strips["TSTRIP2"] = tstrip2;
    }

    //--------------------------------------------------
    colorbuffer = new PixelArray(total_length + 1);
    //--------------------------------------------------
    hexbuffer = Buffer.alloc((total_length * 3) + 3, 0);


    //==================================================
    //Set up default playing animations
    for (var n in strips) {
        strip = strips[n];
        //console.log(n, strip)
        if (strip) {
            strip.animationStack.push(new animations['RAINBOW'](strip.length, {
                blendmode: "ADD"
            }));
        }

        // strip.animationStack.push(new animations['BASIC_ANTS'](strip.length, {
        //     blendmode: "SUB"
        // }));
    };

    console.log("Animations Initialized");
}

//----------------------------------------------
//compile animations into this.hexbuffer
function writeHex(_onDone) {
    //start 3 bytes in
    for (var i = 3; i < colorbuffer.buffer.length; i++) {
        //for (var i = 0; i < colorbuffer.buffer.length; i++) {
        var c = Math.floor(colorbuffer.buffer[i] * 255); //convert from 0 to 1 to 0 to 255
        hexbuffer.writeUInt8(c, i);
    }
    _onDone(); //we are done
}

//----------------------------------------------
function update(_timedelta, _wdata, _onDone) {
    colorbuffer.clear();
    //update animations
    for (var n in strips) {
        strip = strips[n];
        for (var i = (strip.animationStack.length - 1); i >= 0; i--) {
            var anim = strip.animationStack[i];
            if (anim.isDone) {
                //this animation is done playing so lets remove it. 
                strip.animationStack.splice(i, 1); //remove it. 
            } else {
                //carry on as usual
                anim.update(_timedelta, _wdata);
                anim.updateFade(_timedelta);
                colorbuffer.blend(anim.out, strip.write_index, anim.blendmode);
            }
        }
    };
    writeHex(_onDone);
}


//removes all animations that aren't going to terminate. 
function cleanAnimStack(strip) {
    //tell each animation to finish up;
    for (var i = 0; i < strip.animationStack.length; i++) {

        strip.animationStack[i].finish();
    }

    //strip.animationStack = [];
}

function onClear() {
    for (var s in strips) {
        strip = strips[s];
        strip.animationStack = [];
        colorbuffer.clear();
    }
}

function onNewAnimation(anim_params) {
    //console.log(anim_params);
    if (anim_params) {
        var offset = 0; //the number of milisec to wait before playing the animation.
        if (anim_params.offset) {
            offset = anim_params.offset;
        }
        //wait the amount of offset ms
        setTimeout(function() {
            playAniamtion(anim_params);
        }, offset);
    }
}

function playAniamtion(anim_params) {
    var stripnames = anim_params.strips;
    //parse names
    if (stripnames) {
        stripnames.forEach(function(name) {
            var strip = strips[name];
            if (strip) {
                cleanAnimStack(strip);
                var name = anim_params.name.trim().toUpperCase(); //name cleaning for sanity
                var anim_constructor = animations[name];
                if (anim_constructor) {
                    strip.animationStack.push(new anim_constructor(strip.length, anim_params));
                    console.log("Playing ", anim_params.name, " on ", strip.name);
                } else {
                    console.error("Error: No animation named :" + anim_params.name);
                    console.error(anim_params);
                }
            } else {
                //no strip with that name.
                //console.error("Error: No strip named :" + name);
                //console.error(anim_params);
                //console.error(strips);
            }
        });
    }
}




//----------------------------------------------
function getHexBuffer() {
    return hexbuffer;
}

module.exports = {
    init: init,
    update: update,
    getHexBuffer: getHexBuffer,
    onNewAnimation: onNewAnimation,
    onClear: onClear,
}