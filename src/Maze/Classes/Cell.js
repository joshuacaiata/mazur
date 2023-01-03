import classes from './Cell.module.css';

export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.visited = false;

        this.top = true;
        this.right = true;
        this.bottom = true;
        this.left = true;

        this.linked = [];

        this.onPath = false;
        this.algoVisit = false;
    }

    displayCell() {
        let styles = [classes.cell];
        let rowIndex = this.y;
        let cellIndex = this.x;

        // getting background color
        if (this.onPath) {
            styles.push(classes.pathcell);
        } else if (this.algoVisit) {
            styles.push(classes.algocell);
        } else {
            styles.push(classes.normalcell);
        }

        // catching edge cases
        // bottom left corner
        if (cellIndex === 0 & rowIndex === 22) {
            styles.push(classes.bottomWall);
            styles.push(classes.leftWall);
        } 
        
        // top left corner
        else if (cellIndex === 0 && rowIndex === 0) {
            styles.push(classes.topWall);
            styles.push(classes.leftWallWhite);
        } 
        
        // bottom right corner
        else if (cellIndex === 22 && rowIndex === 22) {
            styles.push(classes.bottomWall);
            styles.push(classes.rightWallWhite);
        } 
        
        // top right corner
        else if (cellIndex === 22 && rowIndex === 0) {
            styles.push(classes.topWall);
            styles.push(classes.rightWall);
        } 
        
        // all cells along the left wall (not corners)
        else if (cellIndex === 0) {
            styles.push(classes.leftWall);
        } 
        
        // all cells along the right wall (not corners)
        else if (cellIndex === 22) {
            styles.push(classes.rightWall);
        } 
        
        // all cells along the top wall (not corners)
        else if (rowIndex === 0) {
            styles.push(classes.topWall);
        } 
        
        // all cells along the bottom wall (not corners)
        else if (rowIndex === 22) {
            styles.push(classes.bottomWall);
        }

        // dealing with the rest of the boxes
        this.right ? styles.push(classes.right) : styles.push(classes.whiteright);
        this.top ? styles.push(classes.top) : styles.push(classes.whitetop);
        this.left ? styles.push(classes.left) : styles.push(classes.whiteleft);
        this.bottom ? styles.push(classes.bottom) : styles.push(classes.whitebottom);

        return <div className={styles.join(' ')} key={[rowIndex, cellIndex].join(' ')}/>;
    }
}
