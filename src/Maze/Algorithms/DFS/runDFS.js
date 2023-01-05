import updatePath from "../UpdatePath";
import dfs from "./DFS";

export default function runDFS(maze, setMaze) {
    let runobj = {
        newmaze: maze,
        goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
        stack: [],
        visited: {},
        cameFrom: {},
        path: []
    };

    runobj.stack.push(runobj.newmaze.rows[0].cells[0]);
    runobj.newmaze.rows[0].cells[0].algoVisit = true;
    let end = false;

    function update() {
        return new Promise((resolve) => {
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
