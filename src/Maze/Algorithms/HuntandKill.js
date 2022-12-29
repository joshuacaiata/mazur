export default function HuntandKill(maze) {
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
        console.log(x);
        console.log(y);
        return maze.rows[y].cells[x];
    }

    // get the neighbours of a cell in a maze
    function getNeighbours(cell) {
        let neighbours = [];
        let x = cell.x;
        let y = cell.y;

        if (x > 0) {
            neighbours.push(maze.rows[y].cells[x - 1]);
        }
        if (x < maze.rows[0].cells.length - 1) {
            neighbours.push(maze.rows[y].cells[x + 1]);
        }
        if (y > 0) {
            neighbours.push(maze.rows[y - 1].cells[x]);
        }
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

    let currentCell = randomCell();
    while (currentCell) {
        currentCell.visited = true;
        
        let unvisited = getUnvisitedNeighbours(currentCell);
        if (unvisited.length > 0) {
            let nextCell = random(unvisited);
            linkCells(currentCell, nextCell);
            currentCell = nextCell;
        } else {
            let nextCell = hunt();
            if (nextCell === null) break;
            currentCell = nextCell;
        }
    }

}