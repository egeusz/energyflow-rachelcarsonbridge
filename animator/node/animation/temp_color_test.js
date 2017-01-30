var Color = require('./color.js').Color;
var PixelArray = require('./pixelarray.js').PixelArray;


c1 = new Color(1, 0.5, 0.3);
c2 = new Color(0.5, 0.5, 0);


c2.add(c1);
c2.add(c1);

console.log(c2.r(), c2.g(), c2.b());

pa1 = new PixelArray(15);
pa2 = new PixelArray(5);

pa1.fill(new Color(1, 0.25, 0.25));
pa2.fill(new Color(0, 1, 0));

pa1.blend(pa2, 0, "MULT");
pa2.brightness(0.33);
pa1.blend(pa2, 8, "ADD");

pa1.gradient(new Color(1, 1, 1), new Color(0, 0, 0));
console.log(pa1.buffer);