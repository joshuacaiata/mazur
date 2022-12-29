import Row from './Row.js';
import classes from './Maze.module.css';

export default class Maze {
    constructor(numRows, numCells) {
        this.rows = [];
        for (let i = 0; i < numRows; i++) {
            this.rows.push(new Row(numCells, i));
        }
        this.rows[0].cells[0].left = false;
        this.rows[22].cells[22].right = false;

    }

    displayMaze() {
        return (
            <div className={classes.mazeBox}>
                {this.rows.map((row, rowIndex) => (
                    // looping through the rows, returning a row div for each row
                    row.displayRow(rowIndex)
                ))}
            </div>
        )
    }
}