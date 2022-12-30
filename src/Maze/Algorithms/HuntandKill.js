import Maze from "../Maze";

export default function HuntandKill() {
    let maze = new Maze(23, 23);

    function random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // function to link two cells together (destroy the wall between them)
    function linkCells(cell1, cell2) {
        // if cell1 is to the left of cell2
        if (cell1.x === cell2.x - 1) {
            cell1.right = false;
            cell2.left = false;
        }

        // if cell1 is to the right of cell2
        if (cell1.x === cell2.x + 1) {
            cell1.left = false;
            cell2.right = false;
        }

        // if cell1 is above cell2
        if (cell1.y === cell2.y - 1) {
            cell1.bottom = false;
            cell2.top = false;
        }
        
        // if cell1 is below cell2
        if (cell1.y === cell2.y + 1) {
            cell1.top = false;
            cell2.bottom = false;
        }
    }

    // find a random cell in a maze
    function randomCell() {
        let x = Math.floor(Math.random() * 23);
        let y = Math.floor(Math.random() * 23);
        return maze.rows[y].cells[x];
    }
        

    // get the neighbours of a cell in a maze
    function getNeighbours(cell) {
        let neighbours = [];
        let x = cell.x;
        let y = cell.y;

        // if the cell is on the left edge, don't add the left neighbour
        // otherwise, add the left neighbour
        if (x > 0) {
            neighbours.push(maze.rows[y].cells[x - 1]);
        }

        // if the cell is on the right edge, don't add the right neighbour
        // otherwise, add the right neighbour
        if (x < maze.rows[0].cells.length - 1) {
            neighbours.push(maze.rows[y].cells[x + 1]);
        }

        // if the cell is on the top edge, don't add the top neighbour
        // otherwise, add the top neighbour
        if (y > 0) {
            neighbours.push(maze.rows[y - 1].cells[x]);
        }

        // if the cell is on the bottom edge, don't add the bottom neighbour
        // otherwise, add the bottom neighbour
        if (y < maze.rows.length - 1) {
            neighbours.push(maze.rows[y + 1].cells[x]);
        }
        return neighbours;
    }

    // get the unvisited neighbours of a cell in a maze
    function getUnvisitedNeighbours(cell) {
        let neighbours = getNeighbours(cell);
        let unvisited = neighbours.filter(cell => !cell.visited);
        return unvisited;
    }

    // find visited neighbours of a cell in a maze
    function getVisitedNeighbours(cell) {
        let neighbours = getNeighbours(cell);
        let visited = neighbours.filter(cell => cell.visited);
        return visited
    }

    // "hunt" for an unvisited cell, from the top, going left to right
    // and return the first one that has visited neighbours
    function hunt() {
        for (let i = 0; i < maze.rows.length; i++) {
            for (let j = 0; j < maze.rows[0].cells.length; j++) {
                let cell = maze.rows[i].cells[j];
                if (cell.visited) continue;
                let visited = getVisitedNeighbours(cell);
                if (visited.length > 0) {
                    let randomcell = random(visited);
                    linkCells(cell, randomcell);
                    return cell;
                }
            }
        }
        return null;
    }

    // start the hunt and kill algorithm
    // start with a random cell
    let currentCell = randomCell();
    while (currentCell) {
        // mark the cell as visited
        currentCell.visited = true;
        
        // get the unvisited neighbours of the current cell
        let unvisited = getUnvisitedNeighbours(currentCell);

        // if there are unvisited neighbours, choose a random one
        if (unvisited.length > 0) {
            let nextCell = random(unvisited);
            // connect the cell and its random neighbour
            linkCells(currentCell, nextCell);
            // make the random neighbour the current cell
            currentCell = nextCell;
        } else {
            // if there are no unvisited neighbours, "hunt" for a cell
            let nextCell = hunt();
            // if there are no unvisited cells, break out of the loop
            if (nextCell === null) break;
            // make the hunted cell the current cell
            currentCell = nextCell;
        }
    }

    return maze;

}
