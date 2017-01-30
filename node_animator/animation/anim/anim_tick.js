var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "TICK";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var speed = 0.5;
    var color = new Color(1, 1, 1);
    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
    }

    var pos = 0;
    this.update = function(_timedelta) {
        this.out.clear();
        pos = pos + speed;
        pos = pos % _length;
        this.out.setPixel(color, pos);
    }
}