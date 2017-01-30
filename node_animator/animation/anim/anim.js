var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var utils = require('../utils.js');





function Anim(_length, _params) {
    this.length = Math.floor(_length);

    if (!this.length) {
        console.error("ERROR: Anim(): no length specified or length is not a number : ", _length);
    }
    this.out = new PixelArray(this.length);
    //----------------------------------------------
    //default params
    this.blendmode = "ADD";

    var time_in = 0;
    var time_on = 0;
    var time_out = 0;
    var time_finish = 100; //the fade out time if the animation is forced to finish before it is done. 
    //parse params
    if (_params) {
        if (_params.blendmode) {
            this.blendmode = _params.blendmode;
        }
        if (_params.time_in) {
            time_in = _params.time_in;
        }
        if (_params.time_on) {
            time_on = _params.time_on;
        }
        if (_params.time_out) {
            time_out = _params.time_out;
        }
        if (_params.time_finish) {
            time_finish = _params.time_finish;
        }
    }

    //----------------------------------------------
    //set isDone to true and during next update the animation 
    //control will remove the animation fromm the animation stack
    this.isDone = false;
    var isFinishing = false;
    var time_finishing = 0;

    //called by anim control to tell this animation to finish. 
    this.finish = function() {
        isFinishing = true;
        time_finishing = 0;
    }

    //----------------------------------------------   
    this.update = function(_timedelta) {
        //NO OP
    }


    var time = 0;
    this.updateFade = function(_timedelta) {

        if (isFinishing) {
            time_finishing += _timedelta;

            if (time_finishing > time_finish) {
                //done fading out. set done so this animation gets removed. 
                this.out.clear();
                this.isDone = true;
            } else {
                var a = 1 - (time_finishing / time_finish);
                this.out.brightness(a);
            }
        } else {
            //normal fading
            time += _timedelta;

            if (time_in && !time_out) {
                //just fade in
                var a = time / time_in;
                this.out.brightness(a);


            } else if (!time_in && time_out) {
                //just fade out
                var a = 1 - (time / time_out);
                this.out.brightness(a);

            } else if (time_in && time_out) {
                //fade in and fade out
                if (time < time_in) {
                    var a = time / time_in;
                    this.out.brightness(a);
                } else if (time > time_in + time_on) {
                    var a = 1 - ((time - time_in - time_on) / time_out);
                    this.out.brightness(a);
                }
            } else {
                //no fade just on constantly

            }

            if (time_out) { //check to see if we have an end
                if (time > time_in + time_on + time_out) {
                    //DONE
                    this.out.clear();
                    this.isDone = true;
                }
            }

        }
    }
}


exports.Anim = Anim;