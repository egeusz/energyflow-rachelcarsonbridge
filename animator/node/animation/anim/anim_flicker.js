var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim

exports.Name = "FLICKER"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var color1 = new Color(0, 0, 0);
    var color2 = new Color(1, 1, 1);
    var fadelength = 1500;

    //parse params
    if (_params) {
        if (_params.fadelength) {
            fadelength = _params.fadelength;
        }
        if (_params.color1) {
            color1 = new Color(_params.color1[0], _params.color1[1], _params.color1[2]);
        }
        if (_params.color2) {
            color2 = new Color(_params.color2[0], _params.color2[1], _params.color2[2]);
        }
    }

    var p = -250;
    var current_color;
    this.update = function(_timedelta) {
        p++;
        a = p / fadelength;

        if (Math.random() > p) {
            this.out.fill(color1);
        } else {
            this.out.fill(color2);
        }
    }
}