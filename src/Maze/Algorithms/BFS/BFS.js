import Maze from "../../Classes/Maze";

export default function bfs(maze, start, goal, queue, visited) {
    // make a copy of the maze
    let newmaze = new Maze(23, 23);

    // copy the maze's cells into the new maze
    for (let i = 0; i < maze.rows.length; i++) {
        for (let j = 0; j < maze.rows[i].cells.length; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    // get the path at the start of the queue
    // also get the node at the end of the path
    let path = queue.shift();
    let node = path[path.length - 1];

    // get the neighbors of the node
    let neighbors = node.linked;

    // for each unvisited neighbor and create a new path with the neighbor
    for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        let nquery = `${neighbor.x},${neighbor.y}`;
        neighbor.algoVisit = true;

        if (!(nquery in visited)) {
            visited[nquery] = 1;
            let newpath = [...path, neighbor];
            queue.push(newpath);
        }
    }
    
    return {newmaze, start, goal, queue, visited, path};
}
