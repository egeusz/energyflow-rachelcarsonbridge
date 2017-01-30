var Color = require('../color.js').Color;
var PixelArray = require('../pixelarray.js').PixelArray;
var Anim = require('./anim.js').Anim
var utils = require('../utils.js');



function jumpToNewLocation(marks) {

    var s = Math.floor(Math.random() * marks.length);
    var i = 0;
    while (i < marks.length) {
        if (!marks[s]) { //slot is not used. 
            //mark as used
            //marks[s] = true;
            return s;
        }
        s++;
        s = s % marks.length;
        i++;
    }
    return s;
}

function resetStar(star, marks, steps) {
    //marks[star.pos] = false; //free old slot
    star.pos = jumpToNewLocation(marks);
    star.bStep = Math.floor(Math.random() * steps);
    return star;
}


exports.Name = "SPARKLE";
exports.Anim = function(_length, _params) {
    Anim.call(this, _length);


    var color = new Color(1, 1, 1);
    //var ratio = 150.0 / 173.0; //based on orignal ratio
    var ratio = 0.5;
    var num_steps = 25; //number of brightness steps
    //parse params
    if (_params) {
        if (_params.color) {
            color = new Color(_params.color[0], _params.color[1], _params.color[2]);
        }
        if (_params.ratio) {
            ratio = utils.clamp(_params.ratio, 0.0, 1.0);
        }
        if (_params.num_steps) {
            num_steps = Math.floor(_params.num_steps);
        }
    }

    //set up stars
    var num_stars = Math.floor(ratio * _length);
    var stars = [];
    var marks = new Array(_length);

    //init the brightness gradient
    bsteps = new PixelArray(num_steps);
    bsteps.gradient(new Color(0, 0, 0), color);

    //int stars
    for (var i = 0; i < num_stars; i++) {
        var star = resetStar({}, marks, num_steps);
        marks[star.pos] = true;
        stars.push(star);
    }

    this.update = function(_timedelta) {
        this.out.clear();
        for (var i = 0; i < stars.length; i++) {
            stars[i].bStep = stars[i].bStep - 1;
            if (stars[i].bStep < 0) { //star is black
                //reset star
                marks[stars[i].pos] = false; //clear position
                stars[i] = resetStar(stars[i], marks, num_steps);
                marks[stars[i].pos] = true; //set used at new position
            }
            this.out.setPixel(bsteps.getPixel(stars[i].bStep), stars[i].pos);
        }
    }
}









// #define N_PIXELS      173 //number of pixels in strand (ard in 2nd fl nook)
// #define T_PIX         150 //number of possible live pixels at a given time.
// #define O_INT         100 //time on interval in milliseconds

// unsigned long tDebug = millis();
// int bSteps[O_INT]; //brightness steps
// int interL = 100; //random time interval lower bound
// int interH = 1000; //random time interval higher bound

// struct Pixel_s
// {
//   int state; //0 = seed, 1 = live, 2 = waiting to seed
//   int bStep; //brightness step of given pixel
//   int wait; //time to wait before becoming a seed again
//   unsigned long tRef; //time refference set when pixel enters wait state
// };

// struct Inventory_s
// {
//   int seed; //number of seed pixels when gInventory fuction is run
//   int live; //number of live pixels when gInventory fuction is run
//   int wait; //number of wait pixels when gInventory fuction is run
//   int index[N_PIXELS]; //stores the indices of above pixels states when gInventory fuction is run
// };

// Pixel_s pixel[N_PIXELS]; //create pixel table (array of structs)
// Inventory_s inventory; //create instance of inventory struct

// // see the Adafruit_NeoPixel library documentation
// Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_PIXELS, PIN, NEO_RGB + NEO_KHZ800);

// void setup() {
//   tDebug = millis();

//   // initialize serial communication
//   if (DEBUG != 0) {
//     BEGIN_SERIAL;
//     LOGLN("Arduino reset");
//   }

//   //set random seed
//   randomSeed(analogRead(0));

//   //set state, bStep, and wait for all pixels
//   for (int i = 0; i < N_PIXELS; i++) {
//     pixel[i].state = 0;
//     pixel[i].bStep = 0;
//     pixel[i].wait = 0;
//     pixel[i].tRef = 0;
//   }

//   //interpolate and store brightness step values
//   getBsteps();

//   // initialize the NeoPixel strip
//   strip.begin();
//   strip.show();

//   if (DEBUG == 1 || DEBUG == 2) {
//     statS("Setup", 5);
//   }
// }

// void createPixel() { //creates a "live pixel from a seed
//   tDebug = millis();

//   int oSpots = T_PIX - gInventory(1); //check if there are any "open spots" to create new pixels
//     LOG("oSpots: ");
//     LOGLN(oSpots);
//   if (oSpots > 0) { //if so...
//     int aSeeds = gInventory(0); //check if there are any available seeds to create new pixels
//       LOG("Seeds: ");
//       LOGLN(aSeeds);
//     if (aSeeds >= oSpots) { //if so, as long as the number of seeds is >= the number of "open spots"...
//       for (int i = 0; i < oSpots; i++) { //create live pixels in all the open spots
//         int pix = seedManager(); //if so, find address of next pixel to take live
//               LOG("PickedSeed: ");
//               LOGLN(pix);
//         pixel[pix].state = 1; //set pixel state to "live"
//         pixel[pix].wait = random(interL, interH); //set pixel wait time
//         pixel[pix].bStep = bSteps[random(O_INT-2)]; //show pixel at random bStep value
//         setPix(pix, pixel[pix].bStep); //show pixel at full brightness if above line isn't commented out
//       }
//     } else { //if the number of seeds is < the number of "open spots"
//       for (int i = 0; i < aSeeds; i++) { //create live pixels will all available seeds
//         int pix = seedManager(); //if so, find address of next pixel to take live
//               LOG("PickedSeed: ");
//               LOGLN(pix);
//         pixel[pix].state = 1; //set pixel state to "live"
//         pixel[pix].wait = random(interL, interH); //set pixel wait time
//         pixel[pix].bStep = bSteps[random(O_INT-2)]; //show pixel at random bStep value
//         setPix(pix, pixel[pix].bStep); //show pixel at full brightness if above line isn't commented out
//       }
//     }
//     strip.show();
//   }
//   if (DEBUG == 1 || DEBUG == 3) {
//     statS("createPixel", 11);
//   }
// }

// void stepPixel() { //moves "live" pixels to their next bStep value
//   tDebug = millis();
//   for (int i = 0; i < N_PIXELS; i++) { //find live pixels
//     if (pixel[i].state == 1) {
//       pixel[i].bStep++; //set pixel brightness to next step for stepper
//       if (pixel[i].bStep < O_INT) {
//         setPix(i, pixel[i].bStep); //set pixel to next step
//       } else if (pixel[i].bStep >= O_INT) {
//         killPixel(i);
//       }
//     }
//   }
//   strip.show();
//   if (DEBUG == 1 || DEBUG == 4) {
//     statS("stepPixel", 9);
//   }
// }

// void waitPixel() { //moves "live" pixels to their next bStep value
//   tDebug = millis();
//   for (int i = 0; i < N_PIXELS; i++) { //find waiting pixels
//     if (pixel[i].state == 2) {
//       if (millis() >= pixel[i].tRef + pixel[i].wait ) {
//         pixel[i].state = 0; //set pixel's state to seed
//         pixel[i].bStep = 0; //set bStep back to 0
//         pixel[i].wait = 0; //set bStep back to 0
//         pixel[i].tRef = 0; //set bStep back to 0
//       }
//     }
//   }
//   if (DEBUG == 1 || DEBUG == 5) {
//     statS("waitPixel", 9);
//   }
// }

// int dly = 0;
// void loop() {
//   createPixel();
//   delay(dly);
//   stepPixel();
//   delay(dly);
//   waitPixel();
// }

// void getBsteps() { //interpolate and store brightness step values
//   LOG("bSteps: ");
//   if (O_INT >= 1) {
//     for (int i = 0; i < O_INT; i++) {
//       float j = (float)i;
//       float d = (1 - (j / O_INT)) * 255;
//       bSteps[i] = (int)d;
//       LOGLN(bSteps[i]);
//     }
//   } else {
//     bSteps[O_INT] = 255;
//   }
//   LOGLN(bSteps[O_INT]);
// }

// int gInventory(int state) {
//   if (state == 0) {
//     inventory.seed = 0;
//     for (int i = 0; i < N_PIXELS; i++) { //run through pixel addresses and find seed pixels.
//       if (pixel[i].state == state) {
//         inventory.index[inventory.seed] = i;
//         inventory.seed++;
//       }
//     }
//     return inventory.seed;
//   } else if (state == 1) {
//     inventory.live = 0;
//     for (int i = 0; i < N_PIXELS; i++) { //run through pixel addresses and find live pixels.
//       if (pixel[i].state == state) {
//         inventory.index[inventory.live] = i;
//         inventory.live++;
//       }
//     }
//     return inventory.live;
//   } else if (state == 2) {
//     inventory.wait = 0;
//     for (int i = 0; i < N_PIXELS; i++) { //run through pixel addresses and find waiting pixels.
//       if (pixel[i].state == state) {
//         inventory.index[inventory.wait] = i;
//         inventory.wait++;
//       }
//     }
//     return inventory.wait;
//   }
// }

// int seedManager() { //finds available seeds and picks one to use for next live pixel
//   //  LOGLN("I am seed manager");
//     int numSeeds = gInventory(0); //get current number of seeds
//     //  LOG("numSeeds: ");
//     //  LOGLN(numSeeds);
//     int picked = inventory.index[random(numSeeds)]; //pick next seed to take live from the inventory index array
//     return picked;
// }

// void setPix(int pix, int stp) { //sets given pixel to pixel's bStep value
//   //  LOGLN("I am setPix, set color: ");
//   //  LOGLN(bSteps[stp]);
//   strip.setPixelColor(pix, bSteps[stp], bSteps[stp], bSteps[stp]);
// }

// void killPixel(int pix) { //"kills pixel" by setting state to wait
//   pixel[pix].state = 2; //set pixel's state to wait
//   strip.setPixelColor(pix, 0, 0, 0);
//   pixel[pix].tRef = millis();
// }

// void statS(char *nm, int wrdl) {
//   for (int i = 0; i < wrdl; i++) {
//     LOG(nm[i]);
//   }
//   LOG(" time: ");
//   LOGLN(millis() - tDebug);
//   //  LOG("nPlay: ");
//   //  LOGLN(nPlay);
//   LOGLN("Pixal values");
//   for (int i = 0; i < N_PIXELS; i++) {
//     LOG(i);
//     LOG(": ");
//     LOG(pixel[i].state);
//     LOG(" ");
//     LOG(pixel[i].bStep);
//     LOG(" ");
//     LOG(pixel[i].wait);
//     LOG(" ");
//     LOGLN(pixel[i].tRef);
//   }
// }