#include <OctoWS2811.h>


#define LED_WIDTH 30
#define LED_HEIGHT 3

const int ledsPerStrip = LED_WIDTH * LED_HEIGHT;
DMAMEM int displayMemory[ledsPerStrip*6];
int drawingMemory[ledsPerStrip*6];

byte colorbuffer[ledsPerStrip*3];//rgb bytes read from serial port
unsigned int colors[ledsPerStrip];//rgb stored in 32bit ints for pixel setting

const int config = WS2811_800kHz; // color config is on the PC side
OctoWS2811 leds(ledsPerStrip, displayMemory, drawingMemory, config);

boolean led_toggleled = true; 

void setup() {
  //write to the LED so we know the sketch is running
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  
  //Serial.begin(9600);
  
  Serial.setTimeout(50);
  leds.begin();
  //leds.show();

}


void loop() {
  
  int startChar = Serial.read();
  
  //if we are starting a new frame
  if(startChar == '*'){
    //read out the next two bytes to land on the next multiple of 3
    Serial.read();
    Serial.read();
  
    int count = Serial.readBytes((char *)colorbuffer, sizeof(colorbuffer));
    for(int i = 0; i < ledsPerStrip; i++){
           
      byte r = colorbuffer[i*3];
      byte g = colorbuffer[i*3+1];
      byte b = colorbuffer[i*3+2];
      
      unsigned int color = 0;
      color = color | r;
      color = color << 8;
      color = color | g;
      color = color << 8;
      color = color | b;
      leds.setPixel(i, color);
    }
    //leds.setPixel(0, 0xFF0000);
    leds.show();
    
    if(led_toggleled){digitalWrite(13, HIGH);}
    else {digitalWrite(13, LOW);}
    led_toggleled = !led_toggleled;

    delay(10);//delay to make sure the LEDS had enough time to write

    Serial.write('x');//done writeing
    Serial.println();
  } else {
    
  }
  
}
