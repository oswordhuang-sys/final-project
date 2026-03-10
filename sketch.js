let xs = [];
let ys = [];

let nodeCount = 10;

let selected = -1;

let xA, yA, xB, yB;
let connected = false;

function preload() {
  sound = loadSound("pong.wav");
}

function setup() {
  createCanvas(800, 600);

  //（this “Array value retrieval- xs[i]，ys[i]” was made by ChatGbt5.3）
  for (let i = 0; i < nodeCount; i++) {
    xs[i] = random(100, width - 100);
    ys[i] = random(100, height - 100);
    xs[i] += random(-0.3,0.3);
ys[i] += random(-0.3,0.3);
  }
}

function draw() {
  background(20);

  fill(255);
  noStroke();

  // draw nodes
  for (let i = 0; i < nodeCount; i++) {

    // emergent movement
    xs[i] += random(-0.5, 0.5);
    ys[i] += random(-0.5, 0.5);

    circle(xs[i], ys[i], 20);
  }

  // draw connection
  if (connected) {
    stroke(255);
    line(xA, yA, xB, yB);
  }

  fill(200);
  textAlign(CENTER);
  text("Click two nodes to try connecting them", width/2, 40);
}

function mousePressed() {
  
  sound.play();

  for (let i = 0; i < nodeCount; i++) {

    let d = dist(mouseX, mouseY, xs[i], ys[i]);

    if (d < 15) {

      if (selected === -1) {

        selected = i;

      } else {
        
     //（this “Array value retrieval”was made by ChatGbt5.3）

        xA = xs[selected];
        yA = ys[selected];

        xB = xs[i];
        yB = ys[i];

        // protocol rule
        if (random() < 0.5) {
          connected = true;
        } else {
          connected = false;
        }

        selected = -1;
      }

    }

  }

}
