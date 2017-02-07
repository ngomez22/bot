void setup() {
  size(640, 480);

  //Load example thought,
  String[] text = loadStrings("example-files/thought.txt");
  String thought = format(join(text));
  println(thought);

  //Load example image
  PImage pic = loadImage("example-files/pic.jpg");
  pic.resize(width, height);
  image(pic, 0, 0, width, height);

  //Draw the text
  PFont font = createFont("Impact", 32);
  fill(255);
  textFont(font);
  textAlign(CENTER, CENTER);
  text(thought, width/2, height/2);

  //Save the drawing and exit the sketch
  save("output.png");
  exit();
}

String join(String[] lines) {
   String result = "";
   for(int i=0; i<lines.length; i++) {
      result += lines[i] + " ";
   }
    return result;
}

String format(String raw) {
   String result = "";
   String[] words = raw.split(" ");
   float currChars = 0;
   for(int i=0; i<words.length; i++) {
     if(currChars + words[i].length() < 35){
       result += words[i] + " ";
       currChars +=  words[i].length();
     } else {
       result += "\n";
       currChars = 0;
       i--;
     }
   }
   return result;
}
