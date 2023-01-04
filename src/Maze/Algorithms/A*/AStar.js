import Maze from "../../Classes/Maze";

export default function AStar(path, maze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end) {
    // create new Maze to return
    let newmaze = new Maze(23, 23);

    for (let i = 0; i < 23; i++) {
        for (let j = 0; j < 23; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    // initialize gScore and fScore values
    // please dont ask me why I'm not just passing the cells into the dict
    // It only worked with this way
    // No idea why ;-;
    gScore[[start.x, start.y]] = 0;
    fScore[[start.x, start.y]] = heuristic_cost_estimate(start, goal);

    // find current node with lowest fScore
    let minIndex = findMinFScore(openSet, fScore);
    let current = openSet[minIndex];
    current.algoVisit = true;

    // if current node is goal, reconstruct path and return
    if (current === goal) {
        path = reconstruct_path(newmaze, cameFrom, current)
        end = true;
        return {path, newmaze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end};
    }

    // remove current node from openSet and add to closedSet
    openSet.splice(minIndex, 1);
    closedSet.push(current);

    // for each neighbor of current node
    let neighbors = current.linked;
    for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        neighbor.algoVisit = true;

        // if neighbor is in closedSet, skip
        if (closedSet.includes(neighbor)) {
            continue;
        }

        // calculate what neighbours gScore would be
        let tentative_gScore = gScore[[current.x, current.y]] + 1;

        // if neighbor is not in openSet, add it
        if (!openSet.includes(neighbor)) { openSet.push(neighbor); }
        // if tentative_gScore is greater than neighbor's gScore, skip
        else if (tentative_gScore >= gScore[[neighbor.x, neighbor.y]]) { continue; }

        // update neighbor's gScore, fScore, and cameFrom
        cameFrom[[neighbor.x, neighbor.y]] = [current.x, current.y];
        gScore[[neighbor.x, neighbor.y]] = tentative_gScore;
        fScore[[neighbor.x, neighbor.y]] = gScore[[neighbor.x, neighbor.y]] + heuristic_cost_estimate(neighbor, goal);
    }
    

    return {path, newmaze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end};
}

// helper functions
// ----------------


// calculate cost estimate from current node to goal node using manhattan distance
function heuristic_cost_estimate(start, goal) {
    return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}

// find index of node with lowest fScore
function findMinFScore(openSet, fScore) {
    let min = fScore[[openSet[0].x, openSet[0].y]];
    let minIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
        if (fScore[[openSet[i].x, openSet[i].y]] < min) {
            min = fScore[[openSet[i].x, openSet[i].y]];
            minIndex = i;
        }
    }

    return minIndex;
}

// reconstruct path from start to goal given cameFrom values
function reconstruct_path(maze, cameFrom, current) {
    let total_path = [current];
    while ([current.x, current.y] in cameFrom) {
        let newcurrent = cameFrom[[current.x, current.y]];
        current = maze.rows[newcurrent[1]].cells[newcurrent[0]];
        total_path.push(current);
    }

    return total_path;
}