import updatePath from "../UpdatePath";
import dfs from "./DFS";

export default function runDFS(maze, setMaze) {
    // make an object to hold all the variables needed for the algorithm
    let runobj = {
        newmaze: maze,
        goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
        stack: [],
        visited: {},
        cameFrom: {},
        path: []
    };

    // set things up for the algorithm
    runobj.stack.push(runobj.newmaze.rows[0].cells[0]);
    runobj.newmaze.rows[0].cells[0].algoVisit = true;
    let end = false;

    function update() {
        return new Promise((resolve) => {
            // here we make a quasi-loop, going until we reach the goal and then we halt
            // update the maze at each iteration to animate it on the screen
            let current = runobj.stack[runobj.stack.length - 1];
            if (runobj.stack.length > 0 && !end) {
                runobj = dfs(runobj.newmaze, runobj.goal, 
                                runobj.stack, runobj.visited, 
                                runobj.cameFrom, runobj.path);
                if (current === runobj.goal) { end = true; }
                setMaze(runobj.newmaze);
                setTimeout(() => resolve(update()), 20);
            } else {
                resolve();
            }
        });
    }

    update().then(() => {
        let finalpath = runobj.path;
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
