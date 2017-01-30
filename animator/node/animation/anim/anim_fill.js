var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim

exports.Name = "FILL"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var color = new Color(1, 1, 1);
    //parse params
    if (_params) {
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
    }

    this.update = function(_timedelta) {
        this.out.fill(color);
    }
}