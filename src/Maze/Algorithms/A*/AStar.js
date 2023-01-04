import Maze from "../../Classes/Maze";

export default function AStar(path, maze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end) {
    let newmaze = new Maze(23, 23);

    for (let i = 0; i < 23; i++) {
        for (let j = 0; j < 23; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    gScore[[start.x, start.y]] = 0;
    fScore[[start.x, start.y]] = heuristic_cost_estimate(start, goal);

    let minIndex = findMinFScore(openSet, fScore);
    let current = openSet[minIndex];
    current.algoVisit = true;

    if (current === goal) {
        path = reconstruct_path(newmaze, cameFrom, current)
        end = true;
        return {path, newmaze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end};
    }

    openSet.splice(minIndex, 1);
    closedSet.push(current);

    let neighbors = current.linked;
    for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        neighbor.algoVisit = true;
        if (closedSet.includes(neighbor)) {
            continue;
        }

        let tentative_gScore = gScore[[current.x, current.y]] + 1;

        if (!openSet.includes(neighbor)) { openSet.push(neighbor); }
        else if (tentative_gScore >= gScore[[neighbor.x, neighbor.y]]) { continue; }

        let nx = neighbor.x;
        let ny = neighbor.y;
        let cx = current.x;
        let cy = current.y;
        cameFrom[[nx, ny]] = [cx, cy];
        gScore[[nx, ny]] = tentative_gScore;
        fScore[[nx, ny]] = gScore[[nx, ny]] + heuristic_cost_estimate(neighbor, goal);
    }
    

    return {path, newmaze, start, goal, closedSet, openSet, cameFrom, gScore, fScore, end};
}

function heuristic_cost_estimate(start, goal) {
    return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}

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

function reconstruct_path(maze, cameFrom, current) {
    let total_path = [current];
    while ([current.x, current.y] in cameFrom) {
        let newcurrent = cameFrom[[current.x, current.y]];
        current = maze.rows[newcurrent[1]].cells[newcurrent[0]];
        total_path.push(current);
    }

    return total_path;
}