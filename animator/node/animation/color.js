var utils = require('./utils.js');

//=======================================
//Eric Geusz
//2016
//=======================================

//Simple Color Object
//to use;
// var color = require('./color.js');
// var lightpink = new color.Color(1, 0.55, 0.55); 

// all math is done with doubles between 0.0 and 0.1
// the color object will automatically clamp values out side that range
// when setters are used. 

// lightpink.set(1.45, -1.2, 0.5);
// console.log(lightpink.r(), lightpink.g(), lightpink.b()); -- output -> 1.0 0.0 0.5

//---------------------------------------


function Color(r, g, b) {

    //this.buffer = Buffer.alloc(3, 0);
    this.buffer = new Array(3)

    //---- setters and getters
    this.setRed = function(r) {
        r = utils.clamp(r, 0, 1);
        this.buffer[0] = r;
        return r;
    }
    this.setGreen = function(g) {
        g = utils.clamp(g, 0, 1);
        this.buffer[1] = g;
        return g;
    }
    this.setBlue = function(b) {
        b = utils.clamp(b, 0, 1);
        this.buffer[2] = b;
        return b;
    }

    this.set = function(r, g, b) {
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
    }

    this.setColor = function(color) {
        this.buffer[0] = color.buffer[0];
        this.buffer[1] = color.buffer[1];
        this.buffer[2] = color.buffer[2];
    }

    this.getRed = function() {
        return this.buffer[0];
    }

    this.getGreen = function() {
        return this.buffer[1];
    }

    this.getBlue = function() {
        return this.buffer[2];
    }

    this.r = function(r) {
        if (r || r == 0) {
            r = utils.clamp(r, 0, 1);
            this.buffer[0] = r;
        }
        return this.buffer[0];
    }
    this.g = function(g) {
        if (g || g == 0) {
            g = utils.clamp(g, 0, 1);
            this.buffer[1] = g;
        }
        return this.buffer[1];
    }
    this.b = function(b) {
        if (b || b == 0) {
            r = utils.clamp(b, 0, 1);
            this.buffer[2] = b;
        }
        return this.buffer[2];
    }


    //---- Math
    this.add = function(color) {
        this.buffer[0] += color.buffer[0];
        this.buffer[1] += color.buffer[1];
        this.buffer[2] += color.buffer[2];
        this.buffer[0] = utils.clamp(this.buffer[0], 0, 1);
        this.buffer[1] = utils.clamp(this.buffer[1], 0, 1);
        this.buffer[2] = utils.clamp(this.buffer[2], 0, 1);
        return this;
    }

    this.sub = function(color) {
        this.buffer[0] -= color.buffer[0];
        this.buffer[1] -= color.buffer[1];
        this.buffer[2] -= color.buffer[2];
        this.buffer[0] = utils.clamp(this.buffer[0], 0, 1);
        this.buffer[1] = utils.clamp(this.buffer[1], 0, 1);
        this.buffer[2] = utils.clamp(this.buffer[2], 0, 1);
        return this;
    }


    this.mult = function(color) {
        this.buffer[0] *= color.buffer[0];
        this.buffer[1] *= color.buffer[1];
        this.buffer[2] *= color.buffer[2];
        return this;
    }

    this.pow = function(exp) {
        this.buffer[0] = utils.clamp(Math.pow(this.buffer[0], exp), 0, 1);
        this.buffer[1] = utils.clamp(Math.pow(this.buffer[1], exp), 0, 1);
        this.buffer[2] = utils.clamp(Math.pow(this.buffer[2], exp), 0, 1);
        return this;
    }

    this.set(r, g, b);
    return this;
}









exports.Color = Color