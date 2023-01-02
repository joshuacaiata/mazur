import Cell from './Cell.js';

export default class Row {
    constructor(numCells, rowIndex) {
        this.cells = [];
        for (let i = 0; i < numCells; i++) {
            this.cells.push(new Cell(i, rowIndex));
        }
    }

    displayRow(rowIndex) {
        return (
            <div style={{ display: "flex" }} key={rowIndex}>
                {this.cells.map((cell) => {
                    // displaying the cells in each row
                    return cell.displayCell();
                })}
            </div>
        )
    }
}
