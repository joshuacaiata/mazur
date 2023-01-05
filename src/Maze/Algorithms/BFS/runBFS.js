import updatePath from "../UpdatePath";
import bfs from "./BFS";

export default function runBFS(maze, setMaze) {
    // make an object to hold all the variables needed for the algorithm
    let runobj = {
        newmaze: maze,
        start: maze.rows[0].cells[0],
        goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
        queue: [],
        visited: {},
        path: []
    }

    // set things up for the algorithm
    runobj.queue.push([runobj.start]);
    runobj.visited[`${runobj.start.x},${runobj.start.y}`] = 1;
    runobj.start.algoVisit = true;

    function update() {
        return new Promise((resolve) => {
            // here we make a quasi-loop, going until we reach the goal
            let path = runobj.queue[0];
            let node = path[path.length - 1];
            let end = false;
            if (node === runobj.goal) { end = true; }
            if (runobj.queue.length > 0 && !end) {
                // call the algorithm and then set the maze to reanimate on the screen
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
        // go along the path, marking the cells as on the path
        // return the maze after each iteration to animate it on the screen
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