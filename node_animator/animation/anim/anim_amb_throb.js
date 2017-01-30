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

exports.Name = "AMB_THROB";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length, _params);
    //set up defaults
    var speed = 0.25; //cycles a sec
    var color = new Color(0, 0, 1);
    //parse params
    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
    }

    var count = 0;
    this.update = function(_timedelta) {
        count += speed;
        if (count >= 360) {
            time_count = 0;
        }

        var a = (Math.sin(count * 2 * Math.PI / 180) * 0.5) + 0.5;
        //this.out.clear();

        var c = new Color(color.r() * a, color.g() * a, color.b() * a);

        this.out.fill(c);
    }
}