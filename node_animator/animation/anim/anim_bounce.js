var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "BOUNCE";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var speed = 1;
    var color = new Color(1, 1, 1);
    var size = 5;

    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
        if (_params.size) {
            size = Math.ceil(_params.size);
            if (size >= _length) {
                size = _length;
            }
            if (size <= 0) {
                size = 1;
            }
        }
    }




    var pos = size;
    var dur = 1; //direction

    this.update = function(_timedelta) {
        //NO OP
        pos += speed * dur;
        if (pos + size >= _length) { //bounce
            dur = dur * -1; //flip dur
            pos = _length - size;
        }
        if (pos <= 0) {
            dur = dur * -1; //flip dur
            pos = 0;
        }

        this.out.clear();

        for (var i = Math.floor(pos); i < _length; i++) {
            if (i > Math.floor(pos) + size) {
                break;
            }
            this.out.setPixel(color, i);
        }


    }
}