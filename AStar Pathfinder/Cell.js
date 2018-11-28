function Cell(x, y, w, parentGrid) {
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.x = x;
  this.y = y;

  this.w = w;

  this.grid = parentGrid;

  this.parentCells = [];

  this.show = (c, debug) => {
    let x = this.x * this.w;
    let y = this.y * this.w;
		strokeWeight(2);
    stroke(0);
    fill(c);
    rect(x, y, this.w, this.w);
    if (debug) {
      // Debugging stuff
      let txt = "f : " + String(this.f).substring(0, 5) +
        "\ng : " + String(this.g).substring(0, 5) +
        "\nh : " + String(this.h).substring(0, 5);

      if (this.w >= 50) {
        // Because it's too small to be read
        textSize(this.w / 6);
        text(txt, x + this.w / 10, y + this.w / 4);
      }

    }
  };

  this.setF = () => {
    // F is the final cost
    this.f = this.h + this.g;
  };

  this.setH = (end) => {
    // Our heuristic is simply the distance between this and end
    this.h = dist(this.x, this.y, end.x, end.y);
  };

  this.getNeighbours = () => {
    // This function gets this's neighbours 
    let neighbours = [];
    let i = this.x;
    let j = this.y;

    if (i > 0)
      neighbours.push(this.grid[i - 1][j]);
    if (i < this.grid.length - 1)
      neighbours.push(this.grid[i + 1][j]);
    if (j > 0)
      neighbours.push(this.grid[i][j - 1]);
    if (j < this.grid[0].length - 1)
      neighbours.push(this.grid[i][j + 1]);

    if (i > 0 && j > 0)
      neighbours.push(this.grid[i - 1][j - 1]);
    if (i < this.grid.length - 1 && j > 0)
      neighbours.push(this.grid[i + 1][j - 1]);
    if (j < this.grid[0].length - 1 && i > 0)
      neighbours.push(this.grid[i - 1][j + 1]);
    if (j < this.grid[0].length - 1 && i < this.grid.length - 1)
      neighbours.push(this.grid[i + 1][j + 1]);

    return neighbours;
  }

  this.bestParent = () => {
    if (this.parentCells.length == 0)
      return -1

    let best = this;
    this.parentCells.forEach((item, index) => {
      if (item.f <= best.f && item.f <= this.f) {
        best = item;
      }
    });
    return best;
  };
}