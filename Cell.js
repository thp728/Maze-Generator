class Cell {
    constructor(i, j) {
        this.i = i; // col number => x coord
        this.j = j; // row number => y coord
        this.walls = [true, true, true, true]; // top right bottom left
        this.visited = false;
    }

    highlight(r, g, b,) {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(r,g,b,100);
        rect(x, y, w, w);
    }

    // Finds unvisited neighbor and reutrns it
    checkNeighbors() {
        let neighbors = [];
        let i = this.i;
        let j = this.j;

        let top = grid[index(i, j-1)];
        let right = grid[index(i+1, j)];
        let bottom = grid[index(i, j+1)];
        let left = grid[index(i-1, j)];

        if(top && !top.visited) {
            neighbors.push(top);
        }
        if(right && !right.visited) {
            neighbors.push(right);
        }
        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if(left && !left.visited) {
            neighbors.push(left);
        }

        if(neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
           
    }

    show() {
        let x = this.i * w;
        let y = this.j * w;

        stroke(255);

        if(this.walls[0])
            line(x, y, x+w, y);
        if(this.walls[1])
            line(x+w, y, x+w, y+w);
        if(this.walls[2])
            line(x+w, y+w, x, y+w);
        if(this.walls[3])
            line(x, y+w, x, y);


        if(this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }
}