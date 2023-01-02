export default function Dijkstra(maze) {
    var distances = {}
    let root = maze.rows[0].cells[0];
    distances[root] = 0;
    root.algoVisit = true;

    function getFrontier(cell) {
        let frontier = []
        let rowIndex = cell.y;
        let cellIndex = cell.x;

        if (rowIndex > 0 && !cell.top && 
            !maze.rows[rowIndex - 1].cells[cellIndex].algoVisit) {

                frontier.push(maze.rows[rowIndex - 1].cells[cellIndex]);
                maze.rows[rowIndex - 1].cells[cellIndex].algoVisit = true;

        }

        if (cellIndex > 0 && !cell.left && 
            !maze.rows[rowIndex].cells[cellIndex - 1].algoVisit) {

                frontier.push(maze.rows[rowIndex].cells[cellIndex - 1]);
                maze.rows[rowIndex].cells[cellIndex - 1].algoVisit = true;

        }
        
        if (rowIndex < maze.rows.length && !cell.bottom && 
            !maze.rows[rowIndex + 1].cells[cellIndex].algoVisit) {

                frontier.push(maze.rows[rowIndex + 1].cells[cellIndex]);
                maze.rows[rowIndex + 1].cells[cellIndex].algoVisit = true;
        
        }
        
        if (cellIndex < maze.rows[0].cells.length && !cell.right && 
            !maze.rows[rowIndex].cells[cellIndex + 1].algoVisit) {

                frontier.push(maze.rows[rowIndex].cells[cellIndex + 1]);
                maze.rows[rowIndex].cells[cellIndex + 1].algoVisit = true;
        }

        return frontier;
    }

    function number(cell, distance, i) {
        distances[cell] = distance;
        
        if (i > 10) return;
        if (cell.x === 22 && cell.y === 22) return; 
        else {
            let frontier = getFrontier(cell);
            if (frontier.length === 0) return;
            
            for (let i = 0; i < frontier.length; i++) {
                distances[frontier[i]] = distance + 1;
            }

            for (let i = 0; i < frontier.length; i++) {
                number(frontier[i], distance + 1, i+1);
            }
        }

        return;
    }

    function findAccessibleNeighbours(cell) {
        let neighbours = [];
        let rowIndex = cell.y;
        let cellIndex = cell.x;
        
        if (rowIndex > 0 && !cell.top) {
            neighbours.push(maze.rows[rowIndex - 1].cells[cellIndex]);
        }
        
        if (rowIndex < maze.rows.length && !cell.bottom) {
            neighbours.push(maze.rows[rowIndex + 1].cells[cellIndex]);
        }

        if (cellIndex > 0 && !cell.left) {
            neighbours.push(maze.rows[rowIndex].cells[cellIndex - 1]);
        }

        if (cellIndex < maze.rows[0].cells.length && !cell.right) {
            neighbours.push(maze.rows[rowIndex].cells[cellIndex + 1]);
        }

        return neighbours;

    }

    function findPath() {
        let path = [];
        let currentCell = maze.rows[22].cells[22];

        while (true) {
            path.push(currentCell);
            if (distances[currentCell] === 0) break;
            let curdistance = distances[currentCell];
            let accneighbours = findAccessibleNeighbours(currentCell);

            for (let i = 0; i < accneighbours.length; i++) {
                if (distances[accneighbours[i]] === curdistance - 1) {
                    currentCell = accneighbours[i];
                    continue;
                }
            }

        }

        return path;
    }

    number(root, 0, 0);
    let path = findPath();
    for (let i = 0; i < path.length; i++) {
        let rowIndex = path[i].y;
        let cellIndex = path[i].x;
        maze.rows[rowIndex].cells[cellIndex].onPath = true;
    }

    return maze;
}