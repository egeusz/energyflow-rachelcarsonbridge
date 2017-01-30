var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim
var utils = require('../utils.js');





exports.Name = "CHASER";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);

    var speed = 1;

    var minsize = 1;
    var maxsize = 4;

    var color1 = new Color(1, 1, 1);
    var color2 = new Color(1, 1, 0);

    var spawnrate = 0.01; //little more than one as a second;
    var spawnmax = 500;

    if (_params) {
        if (_params.speed) {
            speed = _params.speed;
        }
        if (_params.size) {
            minsize = _params.length;
            maxsize = _params.length;
        } else {
            if (_params.minsize) {
                minsize = _params.minsize;
            }
            if (_params.maxsize) {
                maxsize = _params.maxsize;
            }
        }
        if (_params.color) {
            color1 = new Color(_params.color[0], _params.color[1], _params.color[2]);
            color2 = new Color(_params.color[0], _params.color[1], _params.color[2]);
        } else {
            if (_params.color1) {
                color1 = new Color(_params.color1[0], _params.color1[1], _params.color1[2]);
            }
            if (_params.color2) {
                color2 = new Color(_params.color2[0], _params.color2[1], _params.color2[2]);
            }
        }
        if (_params.spawnrate) {
            spawnrate = utils.clamp(_params.spawnrate, 0.0, 1.0);
        }
    }

    var segments = [];
    var colors = new PixelArray(_length);
    colors.gradient(color1, color2);


    this.update = function(_timedelta) {
        this.out.clear();

        //NO OP
        //loop backwards so we can delete segs from the array
        //console.log("LOOP", segments.length);
        for (var i = segments.length - 1; i >= 0; i--) {
            var seg = segments[i];
            seg.pos = seg.pos + speed;
            if (seg.pos < -seg.size) {
                //console.log("DIE 1");
                segments.splice(i, 1);
            } else if (seg.pos > _length) {
                //console.log("DIE 2");
                segments.splice(i, 1);

            }

            //console.log(seg.pos, seg.size);

            //draw seg
            for (var j = Math.floor(seg.pos); j < _length; j++) {
                if (j > Math.floor(seg.pos) + seg.size) {
                    break; //done drawing
                }
                if (j > 0) {
                    var c = colors.getPixel(j);
                    this.out.setPixel(c, j);
                }
            }
        }

        if (Math.random() < spawnrate) {
            //console.log("spawn");
            if (segments.length < spawnmax) {
                //spawn new seg 
                var seg = {};
                seg.size = Math.ceil(Math.random() * (maxsize - minsize) + minsize);
                if (speed < 0) { //spawn at top
                    seg.pos = _length;
                } else { //spawn at bottom
                    seg.pos = -seg.size;
                }

                segments.push(seg);
            }

        }

    }
}