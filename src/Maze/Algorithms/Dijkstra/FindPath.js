export default function findPath(maze, distances) {
    let goal = maze.rows[22].cells[22];

    // trace from the goal, going back until you hit the root

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