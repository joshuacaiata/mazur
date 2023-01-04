import updatePath from "../UpdatePath";
import bfs from "./BFS";

export default function runBFS(maze, setMaze) {
        
    let runobj = {
        newmaze: maze,
        start: maze.rows[0].cells[0],
        goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
        queue: [],
        visited: {},
        path: []
    }

    runobj.queue.push([runobj.start]);
    runobj.visited[`${runobj.start.x},${runobj.start.y}`] = 1;
    runobj.start.algoVisit = true;

    function update() {
        return new Promise((resolve) => {
            let path = runobj.queue[0];
            let node = path[path.length - 1];
            let end = false;
            if (node === runobj.goal) { end = true; }
            if (runobj.queue.length > 0 && !end) {
                runobj = bfs(runobj.newmaze, runobj.start, 
                                runobj.goal, runobj.queue, 
                                runobj.visited);
                setMaze(runobj.newmaze);
                setTimeout(() => resolve(update()), 10);
            } else {
                resolve();
            }
        });
    }

    update().then(() => {
        let finalpath = runobj.queue[0].reverse();
        function makePath() {
            return new Promise((resolve) => {
                if (finalpath.length > 0) {
                    let cell = finalpath.pop();
                    setMaze(updatePath(maze, cell.x, cell.y));
                    setTimeout(() => resolve(makePath()), 50);
                } else {
                    resolve();
                }
            });
        }

        makePath();
    });
    
}