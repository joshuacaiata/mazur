import Maze from "../../Classes/Maze";

export default function dfs(maze, goal, stack, visited, cameFrom, path) {
    // make a copy of the maze
    let newmaze = new Maze(23, 23);

    // copy the maze's cells into the new maze
    for (let i = 0; i < newmaze.rows.length; i++) {
        for (let j = 0; j < newmaze.rows[i].cells.length; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    // get current cell (top of stack)
    let current = stack.pop();
    current.algoVisit = true;

    // if current cell is the goal, construct the path and return
    if (current === goal) { 
        path = constructPath(newmaze, current, cameFrom);
        return {newmaze, goal, stack, visited, cameFrom, path};
    }

    // mark current cell as visited
    visited[[current.x, current.y]] = true;

    // get unvisited neighbors of current cell
    let neighbors = current.linked;
    let unvisitedNeighbors = neighbors.filter(neighbor => !([neighbor.x, neighbor.y] in visited));

    // add unvisited neighbors to stack and set cameFrom
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        let n = unvisitedNeighbors[i];
        cameFrom[[n.x, n.y]] = current;
    }

    stack = stack.concat(unvisitedNeighbors);

    // return the new maze, goal, stack, visited, cameFrom, and path
    return {newmaze, goal, stack, visited, cameFrom, path};
}

// construct the path from the goal to the start
function constructPath(maze, current, cameFrom) {
    let path = [];
    let currentCell = current;

    // trace it back to the beginning, following the cameFrom links
    // and push each cell onto the path. If the current cell is not in cameFrom, 
    // we've reached the start of the path
    while ([currentCell.x, currentCell.y] in cameFrom) {
        path.push(currentCell);
        let tofind = cameFrom[[currentCell.x, currentCell.y]];
        currentCell = maze.rows[tofind.y].cells[tofind.x];
    }

    // push the start cell onto the path and return
    path.push(currentCell);
    return path;
}