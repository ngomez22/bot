void setup() {
  //Load example image and text
  String[] text = loadStrings("example-files/thought.txt");
  String thought = join(text);
  println(thought);
  
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
  //exit();
}

String join(String[] lines) {
   String result = "";
   for(int i=0; i<lines.length; i++) {
      result += lines[i] + " "; 
   }
    return result;
}