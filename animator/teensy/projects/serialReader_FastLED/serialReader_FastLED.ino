#include<FastLED.h>


#define NUM_LEDS_PER_STRIP 780
#define NUM_STRIPS 3

CRGB leds[NUM_STRIPS * NUM_LEDS_PER_STRIP];

byte colorbuffer[NUM_LEDS_PER_STRIP*NUM_STRIPS*3];//rgb bytes read from serial port

boolean led_toggleled = true; 

void setup() {
  //write to the LED so we know the sketch is running
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  
  //Serial.begin(9600);

  //LEDS.addLeds<WS2811_PORTDC,NUM_STRIPS,RGB>(leds, NUM_LEDS_PER_STRIP);
  LEDS.addLeds<WS2811,2,RGB>(leds, NUM_LEDS_PER_STRIP);
  LEDS.setBrightness(32);
  
  Serial.setTimeout(50);
}

void loop() {
  int startChar = Serial.read();
  
  //we are starting a new frame
  if(startChar == '*'){
    //read out the next two bytes to land on the next multiple of 3
    Serial.read();
    Serial.read();
    
    int count = Serial.readBytes((char *)colorbuffer, sizeof(colorbuffer));
    for(int i = 0; i < NUM_STRIPS * NUM_LEDS_PER_STRIP; i++){
      
      byte r = colorbuffer[i*3];
      byte g = colorbuffer[i*3+1];
      byte b = colorbuffer[i*3+2];
      
      leds[i].r = r;
      leds[i].g = g;
      leds[i].b = b;
    }  
    LEDS.show();
    
    //toggle LED on each frame push
    if(led_toggleled){digitalWrite(13, HIGH);}
    else {digitalWrite(13, LOW);}
    led_toggleled = !led_toggleled;
    
    delay(10);//delay to make sure the LEDS had enough time to write
    
    Serial.write('x');//done writing.
    Serial.println();

  } else {   
  }
}
