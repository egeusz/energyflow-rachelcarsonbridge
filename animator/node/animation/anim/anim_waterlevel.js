var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


exports.Name = "WATERLEVEL";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);



    var color = new Color(1, 1, 1);
    var size = 5;
    var height = 40;
    var amplitude1 = 2;
    var amplitude2 = 5;
    var amplitude3 = 10;
    var period1 = 10;
    var period2 = 25;
    var period3 = 45;

    //parse params
    if (_params) {
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
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
        if (_params.height) {
            height = _params.height;
        }
        if (_params.amplitude1) {
            amplitude1 = Math.abs(_params.amplitude1);
        }
        if (_params.amplitude2) {
            amplitude2 = Math.abs(_params.amplitude2);
        }
        if (_params.amplitude3) {
            amplitude3 = Math.abs(_params.amplitude3);
        }
        if (_params.period1) {
            period1 = Math.abs(_params.period1);
        }
        if (_params.period2) {
            period2 = Math.abs(_params.period2);
        }
        if (_params.period3) {
            period3 = Math.abs(_params.period3);
        }
    }

    var speed1 = (60 / period1) * (Math.PI / 180);
    var speed2 = (60 / period2) * (Math.PI / 180);
    var speed3 = (60 / period3) * (Math.PI / 180);

    var ang1 = 0;
    var ang2 = 0;
    var ang3 = 0;

    var pos = size;
    var dur = 1; //direction

    this.update = function(_timedelta) {
        this.out.clear();

        //NO OP
        ang1 += speed1;
        if (ang1 > 2 * Math.PI) {
            ang1 = 0;
        }
        ang2 += speed2;
        if (ang2 > 2 * Math.PI) {
            ang2 = 0;
        }
        ang3 += speed3;
        if (ang3 > 2 * Math.PI) {
            ang3 = 0;
        }

        pos = Math.sin(ang1) * amplitude1 + Math.sin(ang2) * amplitude2 + Math.sin(ang3) * amplitude3;


        for (var i = Math.floor(pos); i < _length; i++) {
            if (i > Math.floor(pos) + size) {
                break; //done drawing
            }
            this.out.setPixel(color, i);
        }


    }
}