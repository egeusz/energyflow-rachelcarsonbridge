var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim

exports.Name = "WIPE"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var colors = [
        new Color(1, 0, 0), //red
        new Color(0, 1, 0), //green
        new Color(0, 0, 1), //blue
        new Color(1, 1, 1), //white
        new Color(0, 0, 0), //black
    ];


    speed = 60.0; //moves per sec
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.colors) {
            colors = [];
            for (var i = 0; i < _params.colors.length; i++) {
                var c = _params.colors[i];
                colors.push(new Color(c[0], c[1], c[2]));
            }
        }
    }


    var i = 0;
    var time_count = 0;
    var time_updatethreshold = 1000 / speed;

    var color_index = 0;
    var current_color = colors[color_index];


    this.update = function(_timedelta) {
        time_count += _timedelta;
        if (time_count >= time_updatethreshold) {
            //enough time has passed update the index
            time_count = 0;
            i++;
            if (i >= this.length) {
                //index has reached the end of the strip, cycle color
                i = 0;
                color_index++;
                if (color_index >= colors.length) {
                    //restart the color list
                    color_index = 0;
                }
                current_color = colors[color_index];
            }
            this.out.setPixel(current_color, i);

        }
    }
}