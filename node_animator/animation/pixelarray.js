var utils = require('./utils.js');
var color = require('./color.js');

//=======================================
//Eric Geusz
//2016
//=======================================

//Simple Color Object
//to use;
// var color = require('./color.js');
// var lightpink = new color.Color(1, 0.55, 0.55); 

//---------------------------------------
function PixelArray(_length) {

    this.length = Math.floor(_length) //just in case we get passed a float
    if (!this.length) {
        console.error("ERROR: PixelArray(): no length specified or length is not a number : ", _length);
    }

    this.arraylength = Math.floor(this.length * 3) //force int

    this.buffer = new Array(this.arraylength).fill(0);

    //==============================================================================
    //Clears the buffer and sets everything back to 0
    this.clear = function() {
        this.buffer.fill(0);
    }

    //==============================================================================
    //Sets a pixel to a color at the location.
    this.setPixel = function(color, loc) {
        //console.log(color.r(), color.g(), color.b(), loc);
        if (loc < 0 || this.length <= loc) {
            //console.error("Error: setPixel() index out of bounds.  index=", loc, " length=", this.arraylength);
            return;
        }
        var i = locToIndex(loc);
        this.buffer[i] = color.buffer[0];
        this.buffer[i + 1] = color.buffer[1];
        this.buffer[i + 2] = color.buffer[2];
    }

    //==============================================================================
    //gets the color of a pixel at the given location
    this.getPixel = function(loc) {
        if (loc < 0 || this.length < loc) {
            console.error("Error: getPixel() index out of bounds.  index=", loc, " length=", this.arraylength);
            return;
        }
        var i = locToIndex(loc);
        return new color.Color(this.buffer[i], this.buffer[i + 1], this.buffer[i + 2]);
    }


    //==============================================================================
    //Blend with the given pixelarray starting at the given location and continueing 
    //until it runs into the end of either pixelarray
    //The blend mode can be: 
    //     "ADD"    adds the two colors together at each pixel
    //     "SUB"     subtracts the two colors at each pixel
    //     "MULT"    multiplies the two colors at each pixel
    //     "DIV"     divides the two colors at each pixel
    //     "NONE"    sets the color to the color of the second pixelarray directly with no blending (same as write)

    // "NONE" = 0;
    // "ADD" = 1;
    // "SUB" = 2;
    // "MULT" = 3;
    // "DIV" = 4;

    this.blend = function(pixelArray, loc, mode) {
        var start = locToIndex(loc);

        var i = start;
        var j = 0;
        //if the blending pixel array is left overlapped
        if (i < 0) {
            j = Math.abs(start);
            i = 0;
        }

        switch (mode.toUpperCase()) {
            case "ADD":
                while (i < this.arraylength && j < pixelArray.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] + pixelArray.buffer[j]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] + pixelArray.buffer[j + 1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] + pixelArray.buffer[j + 2]);
                    i += 3;
                    j += 3;
                }
                break;
            case "SUB":
                while (i < this.arraylength && j < pixelArray.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] - pixelArray.buffer[j]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] - pixelArray.buffer[j + 1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] - pixelArray.buffer[j + 2]);
                    i += 3;
                    j += 3;
                }
                break;
            case "MULT":
                while (i < this.arraylength && j < pixelArray.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] * pixelArray.buffer[j]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] * pixelArray.buffer[j + 1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] * pixelArray.buffer[j + 2]);
                    i += 3;
                    j += 3;
                }
                break;
            case "DIV":
                while (i < this.arraylength && j < pixelArray.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] / pixelArray.buffer[j]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] / pixelArray.buffer[j + 1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] / pixelArray.buffer[j + 2]);
                    i += 3;
                    j += 3;
                }
                break;
            case "NONE":
            default:
                while (i < this.arraylength && j < pixelArray.arraylength) {
                    this.buffer[i] = utils.clampColor(pixelArray.buffer[j]);
                    this.buffer[i + 1] = utils.clampColor(pixelArray.buffer[j + 1]);
                    this.buffer[i + 2] = utils.clampColor(pixelArray.buffer[j + 2]);
                    i += 3;
                    j += 3;
                }
                break;
        }

    }

    //==============================================================================
    //Blend with the given color
    //The mode can be: 
    //     "ADD"    adds the two colors together at each pixel
    //     "SUB"     subtracts the two colors at each pixel
    //     "MULT"    multiplies the two colors at each pixel
    //     "DIV"     divides the two colors at each pixel
    //     "NONE"    sets the color to the given colot directly with no blending (same as fill)

    this.blendWithColor = function(color, mode) {
        switch (mode.toUpperCase()) {
            case "ADD":
                var i = 0
                while (i < this.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] + color.buffer[0]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] + color.buffer[1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] + color.buffer[2]);
                    i += 3;
                }
                break;
            case "SUB":
                var i = 0;
                while (i < this.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] - color.buffer[0]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] - color.buffer[1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] - color.buffer[2]);
                    i += 3;
                }
                break;
            case "MULT":
                var i = 0;
                while (i < this.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] * color.buffer[0]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] * color.buffer[1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] * color.buffer[j + 2]);
                    i += 3;
                }
                break;
            case "DIV":
                var i = 0;
                while (i < this.arraylength) {
                    this.buffer[i] = utils.clampColor(this.buffer[i] / color.buffer[0]);
                    this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] / color.buffer[1]);
                    this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] / color.buffer[2]);
                    i += 3;
                }
                break;
            case "NONE":
            default:
                this.fill(color);
                break;
        }
    }

    //==============================================================================
    //Set the Brightness of the entire Array
    //This essentially just multiplies each pixel by a single number
    // use < 1 to dim, use > 1 to brighten
    this.brightness = function(val) {
        var i = 0;
        while (i < this.arraylength) {
            this.buffer[i] = utils.clampColor(this.buffer[i] * val);
            this.buffer[i + 1] = utils.clampColor(this.buffer[i + 1] * val);
            this.buffer[i + 2] = utils.clampColor(this.buffer[i + 2] * val);
            i += 3;
        }
    }

    //==============================================================================
    //sets each pixel to the given color
    this.fill = function(color) {
        var i = 0;
        while (i < this.arraylength) {
            this.buffer[i] = utils.clampColor(color.buffer[0]);
            this.buffer[i + 1] = utils.clampColor(color.buffer[1]);
            this.buffer[i + 2] = utils.clampColor(color.buffer[2]);
            i += 3;
        }
    }

    //writes the given pixelarray into the other
    this.write = function(pixelArray, loc) {
        var start = locToIndex(loc);
        var i = start;
        var j = 0;
        //if the blending pixel array is left overlapped
        if (i < 0) {
            j = Math.abs(start);
            i = 0;
        }
        while (i < this.arraylength && j < pixelArray.arraylength) {
            this.buffer[i] = utils.clampColor(pixelArray.buffer[j]);
            this.buffer[i + 1] = utils.clampColor(pixelArray.buffer[j + 1]);
            this.buffer[i + 2] = utils.clampColor(pixelArray.buffer[j + 2]);
            i += 3;
            j += 3;
        }
    }

    //==============================================================================
    //Draws a linear gradient between color1 and color2 from the start location to 
    //the end location.
    //start and end are optional. if unprovided their default will be 0 to length 
    this.gradient = function(color1, color2, _start, _end) {
        var start = 0;
        if (_start) {
            start = locToIndex(_start);
        }
        var end = this.arraylength - 3;
        if (_end) {
            end = locToIndex(_end);
        }

        if (start < 0 || this.arraylength <= start) {
            console.error("Error: gradient() start index out of bounds.", start);
            return;
        }
        if (end < 0 || this.arraylength <= end) {
            console.error("Error: gradient() end index out of bounds.", end);
            return;
        }

        //if end is smaller than start, swap them
        if (end < start) {
            var temp = start;
            start = end;
            end = temp;
        }

        //get linear color gradient
        var start_color = color1.buffer;
        var length = Math.abs(end - start) / 3;
        var color_delta = new Array(3);
        color_delta[0] = (color2.buffer[0] - color1.buffer[0]) / length;
        color_delta[1] = (color2.buffer[1] - color1.buffer[1]) / length;
        color_delta[2] = (color2.buffer[2] - color1.buffer[2]) / length;


        this.buffer[start] = start_color[0];
        this.buffer[start + 1] = start_color[1];
        this.buffer[start + 2] = start_color[2];
        var i = start + 3;
        var d = 1; //number of pixels
        while (i < end) {
            this.buffer[i] = start_color[0] + (color_delta[0] * d);
            this.buffer[i + 1] = start_color[1] + (color_delta[1] * d);
            this.buffer[i + 2] = start_color[2] + (color_delta[2] * d);
            i += 3;
            d++;
        }
        this.buffer[end] = color2.buffer[0];
        this.buffer[end + 1] = color2.buffer[1];
        this.buffer[end + 2] = color2.buffer[2];


    }


    //---------------------------------------
    function locToIndex(loc) {
        return Math.floor(loc * 3);
    }
}


exports.PixelArray = PixelArray;