export default class Distances {
    constructor(root) {
        // create hash wrapper, initialize root to distance 0
        this.root = root;
        let coords = [];
        coords.push(root.x);
        coords.push(root.y);
        this.cells = {};
        this.cells[coords] = 0;
    }

    getDistance(cell) {
        // convert cell into appropriate query format
        let coords = []
        coords.push(cell.x);
        coords.push(cell.y);

        // perform query
        // if not in the dictionary return -1 distance
        if (coords in this.cells) {
            return this.cells[coords]
        } else {
            return -1;
        }
    }

    setDistance(cell, distance) {
        // setting distance of cell
        let coords = [];
        coords.push(cell.x);
        coords.push(cell.y);
        this.cells[coords] = distance;
    }
}