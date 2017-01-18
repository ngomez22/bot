void setup() {
  //Load example thought
  String[] text = loadStrings("example-files/thought.txt");
  String thought = join(text);
  println(thought);
  
  //Load example image
  PImage pic = loadImage("example-files/pic1.jpg");
  
  size(640, 480);
  
  image(pic, 0, 0, width, height);
  //Paint random colored circle
  float r = random(255);
  float g = random(255);
  float b = random(255);
  noStroke();
  fill(r,g,b,100);
  ellipse(width/2, height/2, 100, 100);
  
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