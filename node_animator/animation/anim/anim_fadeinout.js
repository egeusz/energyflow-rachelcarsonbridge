var utils = require('../utils.js');
var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


//Example of animation params
// {
//     who: "R2",
//     anim: "FADE_IN_OUT",
//     //params for animation
//     color_in: [1, 1, 1],
//     color_out: [0.5, 0.5, 1], <-optional. will be set to the value of color_in if not provided
//     time_in: 250,
//     time_on: 1000,
//     time_out: 750,
// },

exports.Name = "FADE_IN_OUT"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var color_black = new Color(0, 0, 0);
    var color_in = new Color(1, 1, 1);
    var color_out = new Color(0, 0, 1);
    var time_in = 250;
    var time_on = 1000;
    var time_out = 500;
    //parse params
    if (_params) {
        if (_params.color_in) {
            color_in = new Color(_params.color_in[0], _params.color_in[1], _params.color_in[2]);
        }
        if (_params.color_out) {
            color_out = new Color(_params.color_out[0], _params.color_out[1], _params.color_out[2]);
        } else {
            color_out = color_in;
        }
        if (_params.time_in) {
            time_in = _params.time_in;
        }
        if (_params.time_on) {
            time_on = _params.time_on;
        }
        if (_params.time_out) {
            time_out = _params.time_out;
        }
    }

    var time = 0;
    this.update = function(_timedelta) {
        time += _timedelta;
        if (time > time_in + time_on + time_out) {
            //DONE
            this.out.clear();
            this.isDone = true;
            time = 0;
        } else if (time > time_in + time_on) {
            //FADE OUT
            this.out.fill(color_out);
        } else if (time > time_in) {
            //ON
            var a = (time - time_in) / time_on;
            var c = lerpColors(color_in, color_out, a);
            this.out.fill(c);
        } else {
            //FADE IN
            this.out.fill(color_in);
        }
    }
}

function lerpColors(color1, color2, _a) {
    var a = utils.clamp(_a, 0.0, 1.0);
    var r = color1.r() * (1 - a) + color2.r() * a;
    var g = color1.g() * (1 - a) + color2.g() * a;
    var b = color1.b() * (1 - a) + color2.b() * a;
    return new Color(r, g, b);
}