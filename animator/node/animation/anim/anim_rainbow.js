var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim

exports.Name = "RAINBOW";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var fadelength = 30;

    var fade = new PixelArray(fadelength);
    fade.gradient(new Color(1, 1, 1), new Color(0, 0, 0));


    var j = 0;
    this.update = function(_timedelta) {
        j++;
        j = j % _length;

        for (var i = 0; i < _length; i++) {

            var pos = ((i + j) % _length) / _length;

            this.out.setPixel(wheel(pos), i);
        }

        //apply fade
        this.out.blend(fade, -1, "SUB");
    }
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