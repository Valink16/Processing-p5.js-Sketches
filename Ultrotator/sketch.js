let travellingPoints = []; // Array of Points
let previousPositions = []; // Array that will contain lerpX, lerpY for each Point 
let radius; // Radius of the circle
let previous;
let lineRenderer; // Where the lines between points will be rendered

let pPos = [];

function Point(a, parentRadius, aSpeed) {
  this.a = a; // actual polar position on circle
  this.parentR = parentRadius; //radius of the circle
  this.aSpeed = aSpeed; // change of this.a

  this.x; // Stores updated x
  this.y; // Stores updated y
  // this.x, this.y are updated in every call of show 
  
  this.show = function show() {
    this.x = this.parentR * cos(this.a);
    this.y = this.parentR * sin(this.a);

    stroke(255);
    fill(255);
    ellipse(this.x, this.y, 8);
    this.a += this.aSpeed;
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lineRenderer = createGraphics(width, height);
  radius = min(width, height) / 2;
  for (let i = 0; i < 4; i++) {
    let tmp = round(random(-10, 10)) / 100;
    console.log(tmp);
    travellingPoints.push(
      new Point(0, radius, tmp)
    );
  }
  
  for (let i = 0; i < travellingPoints.length - 1; i++) {
    previousPositions[i] = [];
  }

  lineRenderer.background(0);
  lineRenderer.translate(width / 2, height / 2);
  lineRenderer.noFill();
  lineRenderer.stroke(255);
  lineRenderer.ellipse(0, 0, radius * 2);
}

function draw() {
  image(lineRenderer, 0, 0);
  translate(width / 2, height / 2);
  stroke(255);

  travellingPoints.forEach((item, index, array) => {
    item.show();
    if (index > 0) {
      previous = array[index - 1]; // Assign the previous Point
      pPos = previousPositions[index-1];
      
      lerpX = lerp(item.x, previous.x, 0.5);
      lerpY = lerp(item.y, previous.y, 0.5);
      
      line(item.x, item.y, previous.x, previous.y);
      lineRenderer.line(pPos[0], pPos[1], lerpX, lerpY);
      
      pPos[0] = lerpX;
      pPos[1] = lerpY;
      
      previousPositions[index - 1] = pPos;
      
      //lineRenderer.point(lerpX, lerpY);
      /* lineRenderer.line(
        item.x, item.y, previous.x, previous.y
      ); */
    }
  });
  
  //console.log(previousPositions);
}