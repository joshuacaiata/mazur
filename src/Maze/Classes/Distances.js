export default class Distances {
    constructor(root) {
        this.root = root;
        let coords = [];
        coords.push(root.x);
        coords.push(root.y);
        this.cells = {};
        this.cells[coords] = 0;
    }

    getDistance(cell) {
        /*
        console.log("in getDistance");
        console.log(cell)
        console.log(this.cells)
        */

        let coords = []
        coords.push(cell.x);
        coords.push(cell.y);

        if (coords in this.cells) {
            /*
            console.log("cell in this.cells")
            */
            return this.cells[coords]
        } else {
            return -1;
        }
    }

    setDistance(cell, distance) {
        let coords = [];
        coords.push(cell.x);
        coords.push(cell.y);
        this.cells[coords] = distance;
    }
}