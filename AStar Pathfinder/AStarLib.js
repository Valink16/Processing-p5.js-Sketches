function drawGrid(grid, color, debug) {
  // Used to draw the grid and debug
  grid.forEach((col, index, array) => {
    col.forEach((cell, index, array) => {
      cell.show(color, debug);
    });
  });
}

function drawSet(set, color, debug) {
  set.forEach((cell, index, array) => {
    cell.show(color, debug);
  })
}

function move(arrayA, arrayB, toMove) {
  //removing
  for (let i = arrayA.length-1; i >= 0; i--) {
    if (arrayA[i] == toMove) {
    	arrayA.splice(i, 1);
    }
  }
       
  //adding 
  arrayB.push(toMove);
}

function resetGrid(grid) {
	grid.forEach((col, index, array) => {
    col.forEach((cell, index, array) => {
      cell.f = 0;
      cell.g = 0;
      cell.h = 0;
      cell.parentCells = [];
    });
  });
}

function retrace(from, target) {
  /* 
    This function uses from.parentCells to 
    retrace the path to target
	*/
	let path = [];
  let done = false;
  let current = from;
  
  while (!done) {
    // If the current cell has no parents, we are done
    if (current.parentCells.length == 0 || current == target) {
    	done = true;
    }
    if (!path.includes(current)) {
    	path.push(current);
    }
    current = current.bestParent();
    console.log(current);
  }
  
  return path;
};