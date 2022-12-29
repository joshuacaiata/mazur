import React from 'react';
import classes from './Box.module.css';

function Box() {

    // init maze state variable with default maze
    let maze = createMaze(23, 23);

    // create entrance
    maze.rows[0].cells[0].left = false;

    // create exit
    maze.rows[22].cells[22].right = false;


    // function to create cell object 
    function createCell(col, row) {
        return {
            x: col,
            y: row,
            left: true,
            right: true,
            top: true,
            bottom: true,
            visited: false,
        }
    }
    
    // create a row with numCells cells
    function createRow(numCells, rowIndex) {
        const cells = [];
        for (let i = 0; i < numCells; i++) {
            cells.push(createCell(i, rowIndex));
        }
        return { cells };
    }
    
    // create a numRows x numCells size maze
    function createMaze(numRows, numCells) {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(createRow(numCells, i));
        }
        return { rows };
    }

    // function to display cells depending on their properties
    function displayCell(cell) {
        let styles = [classes.cell];
        let rowIndex = cell.y;
        let cellIndex = cell.x;

        // give all cells a top and right border
        cell.right ? styles.push(classes.right) : styles.push(classes.whiteright)
        cell.top ? styles.push(classes.top) : styles.push(classes.whitetop)
        
        // deal with small edge cases
        // if cell is in the bottom left corner
        if (cellIndex === 0 && rowIndex === 22) {

            cell.bottom ? styles.push(classes.bottom) : styles.push(classes.whitebottom)
            cell.left ? styles.push(classes.left) : styles.push(classes.whiteleft)

        } else if (cellIndex === 0) {

            // if the cell is in the left column
            cell.left ? styles.push(classes.left) : styles.push(classes.whiteleft)

        } else if (rowIndex === 22) {

            // if the cell is in the bottom row
            cell.bottom ? styles.push(classes.bottom) : styles.push(classes.whitebottom)

        }
        
        return <div className={styles.join(' ')} key={[rowIndex, cellIndex].join(' ')}/>
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
    function randomCell(maze) {
        let x = Math.floor(Math.random() * maze.rows[0].cells.length);
        let y = Math.floor(Math.random() * maze.rows.length);
        return maze.rows[y].cells[x];
    }

    // get the neighbours of a cell in a maze
    function getNeighbours(maze, cell) {
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
    function getUnvisitedNeighbours(maze, cell) {
        let neighbours = getNeighbours(maze, cell);
        let unvisited = neighbours.filter(cell => !cell.visited);
        return unvisited;
    }

    // find visited neighbours of a cell in a maze
    function getVisitedNeighbours(maze, cell) {
        let neighbours = getNeighbours(maze, cell);
        let visited = neighbours.filter(cell => cell.visited);
        return visited
    }

    // "hunt" for an unvisited cell, from the top, going left to right
    // and return the first one that has visited neighbours
    function hunt(maze) {
        for (let i = 0; i < maze.rows.length; i++) {
            for (let j = 0; j < maze.rows[0].cells.length; j++) {
                let cell = maze.rows[i].cells[j];
                if (cell.visited) continue;
                let visited = getVisitedNeighbours(maze, cell);
                if (visited.length > 0) {
                    let randomcell = random(visited);
                    linkCells(cell, randomcell);
                    return cell;
                }
            }
        }
        return null;
    }

    function random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // generate a maze using the hunt and kill algorithm
    function huntAndKill(maze) {
        let currentCell = randomCell(maze);
        while (currentCell) {
            currentCell.visited = true;
            
            let unvisited = getUnvisitedNeighbours(maze, currentCell);
            if (unvisited.length > 0) {
                let nextCell = random(unvisited);
                linkCells(currentCell, nextCell);
                currentCell = nextCell;
            } else {
                let nextCell = hunt(maze);
                if (nextCell === null) break;
                currentCell = nextCell;
            }
        }
    }

    huntAndKill(maze);

    return (
        // returning maze box onto the screen
        <div className={classes.mazeBox}>
        {maze.rows.map((row, rowIndex) => (
            // looping through the rows, returning a row div for each row
            <div className={classes.row} key={rowIndex}>
            {row.cells.map((cell) => {
                // displaying the cells in each row
                return displayCell(cell);
            })}
            </div>
        ))}
        </div>
    );
}

export default Box;
