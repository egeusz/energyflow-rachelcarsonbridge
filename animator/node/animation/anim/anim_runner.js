var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "RUNNER"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    speed = 1; //moves per sec
    size = 15;

    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.size) {
            size = _params.size;
        }
    }

    var offset = 0;
    var flipstart = true;

    this.update = function(_timedelta) {
        this.out.clear();

        offset = offset + speed;

        if (offset >= size) {
            offset = 0;
            flipstart != flipstart;
        }

        var flip = flipstart;
        var j = offset;
        for (var i = 0; i < _length; i++) {
            if (j % size == 0) {
                flip = !flip;
            }
            if (flip) {
                this.out.setPixel(new Color(1, 1, 1), i);
            }
            j++;
        }
    }
}