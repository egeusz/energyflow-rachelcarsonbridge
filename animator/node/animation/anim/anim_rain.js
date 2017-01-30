var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "RAIN";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    this.update = function(_timedelta) {
        //NO OP
    }
}