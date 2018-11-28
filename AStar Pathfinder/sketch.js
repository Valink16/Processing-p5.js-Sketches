let cols = 5;
let rows = 5;
let grid = [];
let cellWidth = 50;

let openSet = [];
let closedSet = [];

let start;
let end;

let done = false;
let winner; 

let canvas;
function setup() {
  canvas = createCanvas(cellWidth * cols, cellWidth * rows);
  frameRate(60);
  
  background(255);

  // Creating a 2D grid
  for (let i = 0; i < cols; i++) {
    let col = [];
    for (let j = 0; j < rows; j++) {
      col.push(new Cell(
        i, j, cellWidth, grid
      ));
    }
    grid.push(col);
  }

  start = grid[0][0];
  end = grid[grid.length - 1][0];
  
  openSet.push(start); // Adding the starting node to the openSet
}

function draw() {
  canvas.mousePressed(() => {
    /*
    	Here we reset everything when the user 
      clicks on a new target/end
    */
    
    done = false;
    resetGrid(grid);
    
    let newTx = floor(mouseX / cellWidth); // new target x
    let newTy = floor(mouseY / cellWidth); // new target y
    
    console.log(newTx, newTy);
    end = grid[newTx][newTy];
    
  	openSet = []; 
    closedSet = [];
    openSet.push(start);
    loop();
  });
  if (openSet.length > 0 && !done) {
    background(255);
    drawGrid(grid, color(255), true);
  	drawSet(closedSet, color(255, 0, 0), true);
  	drawSet(openSet, color(0, 255, 0), true);
    
    // Finding the cell with the lowest cost(f) in openSet
    winner = openSet[0];
    openSet.forEach((cell) => { 
    	if (cell.f < winner.f) {
      	winner = cell;
        winner.show(color(0, 0, 255), true);
      }
    });
    // Check if winner is the end cell
    if (winner == end) {
    	console.log("Done");
      
      // Setting some values to make retrace algo work
      winner.f = Infinity;
      
      start.f = 0;
      
      done = true;
    }
    
    // Getting neighbours of winner
    let neighbours = winner.getNeighbours();
    
    // Move winner from openSet to closedSet
    move(openSet, closedSet, winner);
  	
    // Evaluating the neighbors
    neighbours.forEach((neighbour, index) => {
    	if (!closedSet.includes(neighbour)) {
      	let tmpG = dist(winner.x, winner.y, neighbour.x, neighbour.y);
        if(neighbour in openSet) {
        	if(tmpG < neighbour.g) {
          	neighbour.g = tmpG;
          }
        } else {
          neighbour.g = tmpG;
          neighbour.parentCells.push(winner);
        	openSet.push(neighbour);
        }
        neighbour.setH(end);
        neighbour.setF();
      } else {
      	//console.log("Neighbour is in closedSet");
      }
    });
    
  } else {
    path = retrace(winner, start);
    drawSet(path, color(255, 0, 255), true);
    noLoop();
  }
}