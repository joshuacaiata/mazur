import updatePath from "../UpdatePath";
import AStar from "./AStar";

export default function runAStar(maze, setMaze) {
        
    let runobj = {
        path: [],
        newmaze: maze,
        start: maze.rows[0].cells[0],
        goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
        closedSet: [],
        openSet: [maze.rows[0].cells[0]],
        cameFrom: {},
        gScore: {},
        fScore: {},
        end: false
    }
    
    function update() {
        return new Promise((resolve) => {
            if (runobj.openSet.length > 0 && runobj.end === false) {
                // call A* algorithm
                runobj = AStar(runobj.path, runobj.newmaze, 
                                runobj.start, runobj.goal, 
                                runobj.closedSet, runobj.openSet, 
                                runobj.cameFrom, runobj.gScore, 
                                runobj.fScore, runobj.end);
                setMaze(runobj.newmaze);
                setTimeout(() => resolve(update()), 20);
            } else {
                resolve();
            }
        });
    }

    update().then(() => {
        let path = runobj.path;
        function makePath() {
            return new Promise((resolve) => {
                if (path.length > 0) {
                    let cell = path.pop();
                    console.log("updating path");
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