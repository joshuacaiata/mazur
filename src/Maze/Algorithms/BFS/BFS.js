import Maze from "../../Classes/Maze";

export default function bfs(maze, start, goal, queue, visited) {

    let newmaze = new Maze(23, 23);

    for (let i = 0; i < maze.rows.length; i++) {
        for (let j = 0; j < maze.rows[i].cells.length; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }


    let path = queue.shift();
    let node = path[path.length - 1];

    let neighbors = node.linked;

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
