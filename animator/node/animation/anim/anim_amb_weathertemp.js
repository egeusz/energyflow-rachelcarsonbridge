var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim;
var utils = require('../utils.js');



exports.Name = "WEATHER_TEMP";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var wspeed_low = 0;
    var wspeed_high = 40; //mph

    var temp_low = 0;
    var temp_high = 100;

    var color_low = new Color(1, 0, 0);
    var color_high = new Color(1, 1, 0);

    var current_color = color_low;

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

        if (_params.color_low) {
            color_low = new Color(_params.color_low[0], _params.color_low[1], _params.color_low[2]);
        }

        if (_params.color_high) {
            color_high = new Color(_params.color_high[0], _params.color_high[1], _params.color_high[2]);
        }

    }

    var temp = null;
    var windspeed = null;


    this.update = function(_timedelta, _wdata) {
        //if we gots new weather data!!!
        if (_wdata) {
            if (_wdata.temp) {
                if (_wdata.temp != temp) {
                    temp = _wdata.temp;
                    // //recalc the gradient
                    var a = (temp - temp_low) / (temp_high - temp_low);
                    console.log(a);
                    current_color = lerpColors(color_low, color_high, a);
                    // var color = lerpColors(color_low, color_high, a);
                    // var color2 = lerpColors(color2_low, color2_high, a);
                    // colors.gradient(color, color2);
                }
            }
            if (_wdata.wind) {
                if (_wdata.wind != windspeed) {
                    windspeed = _wdata.wind;
                    //var a = (windspeed - wspeed_low) / (wspeed_high - wspeed_low);
                }
            }
        }

        this.out.fill(current_color);
    }
}


function lerpColors(color, color2, _a) {
    var a = utils.clamp(_a, 0.0, 1.0);
    var r = color.r() * (1 - a) + color2.r() * a;
    var g = color.g() * (1 - a) + color2.g() * a;
    var b = color.b() * (1 - a) + color2.b() * a;
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