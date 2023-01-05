import Maze from "../../Classes/Maze";

export default function dfs(maze, goal, stack, visited, cameFrom, path) {
    let newmaze = new Maze(23, 23);

    for (let i = 0; i < newmaze.rows.length; i++) {
        for (let j = 0; j < newmaze.rows[i].cells.length; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    let current = stack.pop();
    current.algoVisit = true;

    if (current === goal) { 
        path = constructPath(newmaze, current, cameFrom);
        return {newmaze, goal, stack, visited, cameFrom, path};
    }

    visited[[current.x, current.y]] = true;

    let neighbors = current.linked;
    let unvisitedNeighbors = neighbors.filter(neighbor => !([neighbor.x, neighbor.y] in visited));

    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        let n = unvisitedNeighbors[i];
        cameFrom[[n.x, n.y]] = current;
    }

    stack = stack.concat(unvisitedNeighbors);

    return {newmaze, goal, stack, visited, cameFrom, path};
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