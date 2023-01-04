export default function dfs(maze, start, goal) {
    let stack = []; 
    stack.push(start);

    let visited = {};
    let cameFrom = {};

    while (stack.length > 0) {
        let current = stack.pop();

        if (current === goal) { 
            return constructPath(maze, current, cameFrom);
        }

        visited[[current.x, current.y]] = true;

        let neighbors = current.linked;
        let unvisitedNeighbors = neighbors.filter(neighbor => !([neighbor.x, neighbor.y] in visited));

        for (let i = 0; i < unvisitedNeighbors.length; i++) {
            let n = unvisitedNeighbors[i];
            cameFrom[[n.x, n.y]] = current;
        }

        stack = stack.concat(unvisitedNeighbors);
    }

    return [];
}

function constructPath(maze, current, cameFrom) {
    let path = [];
    let currentCell = current;
    while ([currentCell.x, currentCell.y] in cameFrom) {
        path.push(currentCell);
        let tofind = cameFrom[[currentCell.x, currentCell.y]];
        currentCell = maze.rows[tofind.y].cells[tofind.x];
    }
    path.push(currentCell);
    return path;
}