let xs = [];
let ys = [];

let connections = [];

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
  drawBackground();

  // nodes all
  for (let i = 0; i < n; i++) {
    // shaking
    xs[i] = xs[i] + random(-0.5, 0.5);
    ys[i] = ys[i] + random(-0.5, 0.5);

    fill(255);
    noStroke();
    ellipse(xs[i], ys[i], 20, 20);
  }

  // draw all connections
  stroke(255);
  for (let c of connections) {
    
    //Regarding the display issue of the connection, I asked ChatGPT5.3 to make the necessary changes. This is because initially, my links would disappear immediately after the next connection was triggered.
    
    line(c.x1, c.y1, c.x2, c.y2);
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
          connections.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
          });
        }

        selected = -1;
      }
    }
  }
}

// Draw a gradient background with noise points.
function drawBackground() {
  
  //Regarding the issue of displaying noise in this step, I consulted ChatGPT5.3 to make the necessary changes because initially, the noise was almost impossible to display.
  
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(20, 20, 40), color(40, 40, 80), inter);
    stroke(c);
    line(0, i, width, i);
  }
  strokeWeight(3);
  
  for (let i = 0; i < 500; i++) {
    let px = random(width);
    let py = random(height);
    let alpha = random(20, 50);
    stroke(255, 255, 255, alpha);
    point(px, py);
  }
}
