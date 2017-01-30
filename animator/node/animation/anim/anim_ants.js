var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim


// {
//     who: "R2",
//     anim: "BASIC_ANTS",
//     //params for animation
//     color1: [1, 0, 0],
//     color2: [0, 0, 0],
//     speed: 25,
//     time_in: 50,
//     time_on: 3900,
//     time_out: 50,
// }

exports.Name = "ANTS"
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    this.speed = 60; //moves per sec
    var color1 = new Color(0, 0, 1);
    var color2 = new Color(0.05, 0, 0);
    //parse params
    if (_params) {
        if (_params.speed) {
            this.speed = _params.speed;
        }
        if (_params.color1) {
            color1 = new Color(_params.color1[0], _params.color1[1], _params.color1[2]);
        }
        if (_params.color2) {
            color2 = new Color(_params.color2[0], _params.color2[1], _params.color2[2]);
        }
    }

    var sum = 0;
    var time_count = 0;
    var time_updatethreshold = 1000 / this.speed;
    this.update = function(_timedelta) {
        time_count += _timedelta;
        if (time_count >= time_updatethreshold) {

            this.out.clear();

            for (var i = 0; i < this.length; i++) {
                if ((i + sum) % 3 < 1) {
                    this.out.setPixel(color1, i);
                } else {
                    this.out.setPixel(color2, i);
                }

            }
            //enough time has passed update the index
            time_count = 0;
            sum++;
            if (sum >= this.length) {
                //index has reached the end of the strip, cycle color
                sum = 0;
            }

        }
    }
}