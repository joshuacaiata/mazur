export default function Dijkstra(maze) {
    let root = maze.rows[0].cells[0];
    let goal = maze.rows[22].cells[22];

    // find all distances from root
    let distances = root.distances();

    // trace from the goal, going back until you hit the root
    function findPath() {
        let path = [];
        let currentCell = goal;

        while (true) {
            
            path.push(currentCell);
            let curdistance = distances.getDistance(currentCell);
            if (curdistance === 0 || curdistance === -1) break;

            let linked = currentCell.linked;

            for (let i = 0; i < linked.length; i++) {
                let link = linked[i];
                if (distances.getDistance(link) === (curdistance - 1)) {
                    currentCell = link;
                    continue;
                }
            }
        }

        return path;
    }

    // find the path
    let path = findPath();
    for (let i = 0; i < path.length; i++) {
        // change the status of each cell along the path and
        // mark them all as onPath
        let rowIndex = path[i].y;
        let cellIndex = path[i].x;
        maze.rows[rowIndex].cells[cellIndex].onPath = true;
    }
    
    return maze;
}