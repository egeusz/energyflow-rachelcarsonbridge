var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "WEEP";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var speed = 1;
    var color1 = new Color(1, 1, 1);
    var color2 = new Color(0, 0, 0);

    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.color1) {
            color1 = new Color(_params.color1[0], _params.color1[1], _params.color1[2]);
        }
        if (_params.color2) {
            color2 = new Color(_params.color2[0], _params.color2[1], _params.color2[2]);
        }
    }

    var colors = new PixelArray(_length * 3);

    // colors.gradient(new Color(0, 0, 0), color2, 0, _length * 2);
    // colors.gradient(color2, color1, _length * 2, (colors.length - 1));
    colors.gradient(color1, color2, 0, _length);
    colors.gradient(color2, new Color(0, 0, 0), _length, colors.length - 1);

    var pos = _length;


    this.update = function(_timedelta) {

        pos -= speed;
        if (pos > -(_length * 4)) {
            this.isDone = true;
        }
        this.out.clear();
        this.out.blend(colors, Math.floor(pos), "NONE");

    }
}