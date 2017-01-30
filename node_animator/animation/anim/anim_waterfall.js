var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


// {
//     who: "ALL",
//     anim: "AMB_THROB",
//     //params for animation
//     color: [1, 0, 0],
//     speed: 0.25,
//     time_in: 50,
//     time_on: 3900,
//     time_out: 50,
// }



exports.Name = "WATERFALL";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var speed = 1;
    var color_black = new Color(0, 0, 0);
    var color1 = new Color(0.75, 0.75, 1.0);
    var color2 = new Color(0, 0.3, 1.0);
    var color3 = new Color(0, 0, 1);
    var glength = 40;
    var fadelength = 20;

    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.color1) {
            color1 = new Color(_params.color1[0], _params.color1[1], _params.color1[2]);
        }
        if (_params.color2) {
            //color = new Color(_params.color[0], _params.color[1], _params.color[2]);
            color2 = new Color(_params.color2[0], _params.color2[1], _params.color2[2]);
        }
        if (_params.color3) {
            color3 = new Color(_params.color3[0], _params.color3[1], _params.color3[2]);
        }
        if (_params.glength) {
            glength = _params.glength;
        }
        if (_params.fadelength) {
            fadelength = _params.fadelength;
        }
    }

    var colors = new PixelArray(glength);


    var gpos1 = Math.floor(glength * 0.2);
    var gpos2 = Math.floor(glength * 0.35);
    var gpos3 = Math.floor(glength * 0.45);

    colors.gradient(color_black, color1, 0, gpos1);
    colors.gradient(color1, color2, gpos1, gpos2);
    colors.gradient(color2, color3, gpos2, gpos3);
    colors.gradient(color3, color_black, gpos3, glength - 1);

    var fade = new PixelArray(fadelength);
    fade.gradient(new Color(1, 1, 1), color_black);


    var offset = 0;

    this.update = function(_timedelta, _wdata) {

        offset = offset + speed;
        if (offset < 0) {
            offset = offset + _length;
        }
        if (offset >= _length) {
            offset = offset - _length;
        }

        var k = Math.floor(offset);
        for (var i = 0; i < _length; i++) {
            k++
            k = k % glength;
            //console.log(i, _length, k, glength);

            var c = colors.getPixel(k);
            this.out.setPixel(c, i);
        }

        //apply fade
        this.out.blend(fade, -1, "SUB");
    }
}