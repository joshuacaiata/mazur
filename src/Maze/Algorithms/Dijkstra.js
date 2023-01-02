export default function Dijkstra(maze) {
    let root = maze.rows[0].cells[0];
    let goal = maze.rows[22].cells[22];

    console.log("entering dijkstra");

    let distances = root.distances();

    function findPath() {
        console.log("entering findPath");
        let path = [];
        let currentCell = goal;

        while (true) {
            console.log("currentCell:", currentCell);
            
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

        console.log("exiting findpath");
        return path;
    }

    
    let path = findPath();
    for (let i = 0; i < path.length; i++) {
        let rowIndex = path[i].y;
        let cellIndex = path[i].x;
        maze.rows[rowIndex].cells[cellIndex].onPath = true;
    }

    console.log(path);
    
    console.log("exiting dijkstra");
    
    return maze;
}