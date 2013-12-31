/*jslint plusplus: true */
/*jslint sloppy: true */

function randomInt(max) {
    return Math.floor(Math.random() * max + 1);
}

function Direction(x, y) {
    this.x = x;
    this.y = y;
}

Direction.NONE = new Direction(0, 0);
Direction.NORTH = new Direction(0, 1);
Direction.NORTHEAST = new Direction(1, 1);
Direction.EAST = new Direction(1, 0);
Direction.SOUTHEAST = new Direction(1, -1);
Direction.SOUTH = new Direction(0, -1);
Direction.SOUTHWEST = new Direction(-1, -1);
Direction.WEST = new Direction(-1, 0);
Direction.NORTHWEST = new Direction(-1, 1);

Direction.ALL = [
    Direction.NORTH,
    Direction.NORTHEAST,
    Direction.EAST,
    Direction.SOUTHEAST,
    Direction.SOUTH,
    Direction.SOUTHWEST,
    Direction.WEST,
    Direction.NORTHWEST];

Direction.randomDirection = function () {
    return Direction.ALL[randomInt(7)];
};

function Cell(grid, x, y) {
    this.grid = grid;
    this.x = x;
    this.y = y;
}

Cell.prototype.initNeighbours = function () {
    this.neighbours = [];
    var i, direction, nx, ny, neighbour;
    for (i = 0; i < Direction.ALL.length; i++) {
        direction = Direction.ALL[i];
        nx = this.x + direction.x;
        ny = this.y + direction.y;
        if (nx === this.grid.width) {
            nx = 0;
        } else if (nx === -1) {
            nx = this.grid.width - 1;
        }
        if (ny === this.grid.height) {
            ny = 0;
        } else if (ny === -1) {
            ny = this.grid.height - 1;
        }
        neighbour = this.grid.getCell(nx, ny);
        this.neighbours[i] = neighbour;
    }
};

Cell.prototype.toString = function () {
    return this.x + ',' + this.y;
};

Cell.prototype.randomNeighbour = function () {
    return this.neighbours[randomInt(8)];
};

Cell.prototype.eachNeighbour = function (f) {
    var i;
    for (i = 0; i < 8; i++) {
        f(this.neighbours[i]);
    }
};

function Grid(width, height) {

    var x, y, column;

    this.width = width;
    this.height = height;
    this.cells = [];

    for (x = 0; x < width; x++) {
        column = [];
        this.cells[x] = column;
    }
    for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
            this.cells[x][y] = new Cell(this, x, y);
        }
    }
    this.eachCell(function (cell) {
        cell.initNeighbours();
    });
}



Grid.prototype.randomCell = function () {
    var x, y;
    x = randomInt(this.width) - 1;
    y = randomInt(this.width) - 1;
    return this.getCell(x, y);
};

Grid.prototype.getCell = function (x, y) {
    return this.cells[x][y];
};

Grid.prototype.eachCell = function (f) {
    var x, y, cell;
    for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
            cell = this.getCell(x, y);
            f(cell, x, y);
        }
    }
};