let xs = [];
let ys = [];

let n = 10;
let selected = -1;

let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let connected = false;
let sound;

function preload() {
  sound = loadSound("pong.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < n; i++) {
    xs[i] = random(100, width - 100);
    ys[i] = random(100, height - 100);

    xs[i] = xs[i] + random(-0.3, 0.3);
    ys[i] = ys[i] + random(-0.3, 0.3);
  }
}

function draw() {
  background(20);

  // nodes
  for (let i = 0; i < n; i++) {
    // shaking
    xs[i] = xs[i] + random(-0.5, 0.5);
    ys[i] = ys[i] + random(-0.5, 0.5);

    fill(255);
    noStroke();
    ellipse(xs[i], ys[i], 20, 20);
  }

  // connection
  if (connected) {
    stroke(255);
    line(x1, y1, x2, y2);
  }

  fill(200);
  textAlign(CENTER);
  text("Click two nodes to try connecting them", width / 2, 40);
}

function mousePressed() {
  sound.play();

  for (let i = 0; i < n; i++) {
    let d = dist(mouseX, mouseY, xs[i], ys[i]);

    if (d < 15) {
      if (selected == -1) {
        selected = i;
      } else {
        x1 = xs[selected];
        y1 = ys[selected];

        x2 = xs[i];
        y2 = ys[i];
        let rate = random();
        if (rate < 0.5) {
          connected = true;
        } else {
          connected = false;
        }
        selected = -1;
      }
    }
  }
}
