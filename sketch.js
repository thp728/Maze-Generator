// Globals
let cols, rows;
let w = 20; // width of each cell is 40px
let grid = [];

let current;

let stack = [];

function setup() {
    createCanvas(400, 400); // 400x400 px canvas
    cols = Math.floor(width/w);
    rows = Math.floor(height/w);
    //  frameRate(5);

    // Create all the cells
    for(let j=0; j<rows; j++) {
        for(let i=0; i<cols; i++) {
            let cell = new Cell(i,j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function draw() {
    background(51); // grayscale integer value

    // Display all the cells
    for( let i=0; i<grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight(0, 255, 0);

    // Choose one unvisited neighbor randomly
    let next = current.checkNeighbors();
    if(next) {
        // Mark this neighbor as visited
        next.visited = true;

        // Push current cell to the stack
        stack.push(current);
        
        // Remove walls between current cell and neighbor
        removeWalls(current, next);

        // Update current to the chosen neighbor
        current = next;
    } else if(stack.length > 0) {
        
        // Backtracking
        current = stack.pop();

    }
}

function index(i, j) {
    if( i<0 || j<0 || i>cols-1 || j>rows-1) {
        return -1;
    }
    return (i + j*cols);
}

function removeWalls(a, b) {
    let x = a.i - b.i;
    if(x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if(x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    let y = a.j - b.j;
    if(y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if(y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}