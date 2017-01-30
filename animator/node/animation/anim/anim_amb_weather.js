var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim;
var utils = require('../utils.js');



exports.Name = "WEATHER";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var wspeed_low = 0;
    var wspeed_high = 20; //mph

    var temp_low = 0;
    var temp_high = 100;

    var maxspeed = 5;

    var minsize = 1;
    var maxsize = 4;

    var color1_low = new Color(1, 0, 0);
    var color2_low = new Color(0, 0, 0);
    var color1_high = new Color(1, 1, 0.5);
    var color2_high = new Color(1, 1, 0);

    var spawnrate = 0.1; //little more than one as a second;
    var spawnmax = 500;

    //parse params
    if (_params) {
        if (_params.wspeed_low) {
            wspeed_low = _params.wspeed_low;
        }
        if (_params.wspeed_high) {
            wspeed_high = _params.wspeed_high;
        }
        if (_params.temp_low) {
            //color = new Color(_params.color[0], _params.color[1], _params.color[2]);
            temp_low = _params.temp_low;
        }
        if (_params.temp_high) {
            temp_high = _params.temp_high
        }
        if (_params.speed) {
            speed = _params.speed;
        }

        if (_params.minsize) {
            minsize = _params.minsize;
        }
        if (_params.maxsize) {
            maxsize = _params.maxsize;
        }

        if (_params.maxspeed) {
            maxspeed = _params.maxspeed;
        }

        if (_params.color1_low) {
            color1_low = new Color(_params.color1_low[0], _params.color1_low[1], _params.color1_low[2]);
        }
        if (_params.color2_low) {
            color2_low = new Color(_params.color2_low[0], _params.color2_low[1], _params.color2_low[2]);
        }

        if (_params.color1_high) {
            color1_high = new Color(_params.color1_high[0], _params.color1_high[1], _params.color1_high[2]);
        }
        if (_params.color2_high) {
            color2_high = new Color(_params.color2_high[0], _params.color2_high[1], _params.color2_high[2]);
        }
    }

    var segments = [];
    var colors = new PixelArray(_length);

    var temp = null;
    var windspeed = null;


    var fadelength = 30;

    var fade = new PixelArray(fadelength);
    fade.gradient(new Color(1, 1, 1), new Color(0, 0, 0));

    this.update = function(_timedelta, _wdata) {

        this.out.clear();

        //if we gots new weather data!!!
        if (_wdata) {
            if (_wdata.temp) {
                if (_wdata.temp != temp) {
                    temp = _wdata.temp;
                    // //recalc the gradient
                    // var a = (temp - temp_low) / (temp_high - temp_low);
                    // var color1 = lerpColors(color1_low, color1_high, a);
                    // var color2 = lerpColors(color2_low, color2_high, a);
                    // colors.gradient(color1, color2);
                }
            }
            if (_wdata.wind) {
                if (_wdata.wind != windspeed) {
                    windspeed = _wdata.wind;

                    var a = (windspeed - wspeed_low) / (wspeed_high - wspeed_low);

                    spawnrate = utils.clamp((a * 0.4) + 0.05, 0.0, 1.0);

                    maxsize = Math.floor(a * 20);

                }
            }
        }

        //NO OP
        //loop backwards so we can delete segs from the array
        for (var i = segments.length - 1; i >= 0; i--) {
            var seg = segments[i];
            seg.pos = seg.pos - seg.speed;
            if (seg.pos < -seg.size) {
                segments.splice(i, 1);
            } else if (seg.pos > _length) {
                segments.splice(i, 1);
            }

            //draw seg
            for (var j = Math.floor(seg.pos); j < _length; j++) {
                if (j > Math.floor(seg.pos) + seg.size) {
                    break; //done drawing
                }
                if (j > 0) {
                    var p = seg.pos / _length;
                    var c = wheel(p);
                    this.out.setPixel(c, j);
                }
            }
        }

        if (Math.random() < spawnrate) {
            //spawn new seg 
            var seg = {};
            seg.size = Math.ceil(Math.random() * (maxsize - minsize) + minsize);
            seg.pos = _length;
            seg.speed = (Math.random() * maxspeed) + 0.5;

            segments.push(seg);
        }

        //mult in the colors
        //this.out.blend(colors, 0, "MULT");

        //apply fade
        //this.out.blend(fade, -1, "SUB");

    }
}


function lerpColors(color1, color2, _a) {
    var a = utils.clamp(_a, 0.0, 1.0);
    var r = color1.r() * (1 - a) + color2.r() * a;
    var g = color1.g() * (1 - a) + color2.g() * a;
    var b = color1.b() * (1 - a) + color2.b() * a;
    return new Color(r, g, b);
}


// Input a value 0 to 1 to get a color value.
// The colours are a transition r - g - b - back to r.
function wheel(pos) {
    pos = 1 - pos;
    if (pos < 0.333333) {
        return new Color(1 - pos * 3, 0, pos * 3);
    }
    if (pos < 0.666666) {
        pos -= 0.333333;
        return new Color(0, pos * 3, 1 - pos * 3);
    }
    pos -= 0.666666;
    return new Color(pos * 3, 1 - pos * 3, 0);
}