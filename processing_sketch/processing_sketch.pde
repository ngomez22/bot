void setup() {
  size(640, 360);
  background(200);
  float r = random(255);
  float g = random(255);
  float b = random(255);
  noStroke();
  fill(r,g,b,100);
  ellipse(320, 180, 100, 100);
  
  //Save the drawing and exit the sketch
  save("output.png");
  exit();
}