import updatePath from "../UpdatePath";
import AStar from "./AStar";

export default function runAStar(maze, setMaze) {
    // create an object to hold all the data needed for the algorithm
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
            // here we create a quasi-loop which returns the maze at each state
            // we then set the maze at each loop to generate it on the screen
            // we use a promise to make sure the maze is set before the next loop
            if (runobj.openSet.length > 0 && runobj.end === false) {
                // call A* algorithm
                runobj = AStar(runobj.path, runobj.newmaze, 
                                runobj.start, runobj.goal, 
                                runobj.closedSet, runobj.openSet, 
                                runobj.cameFrom, runobj.gScore, 
                                runobj.fScore, runobj.end);
                // set the maze to the new maze
                setMaze(runobj.newmaze);
                // wait 20ms before the next loop
                setTimeout(() => resolve(update()), 20);
            } else {
                resolve();
            }
        });
    }

    // call the update function
    update().then(() => {
        // once the algorithm is done, we need to make the path
        // get the path from the runobj
        let path = runobj.path;
        function makePath() {
            return new Promise((resolve) => {
                // here we create a quasi-loop again which traces over the path
                // which marks the cells as on the path and re-animates the maze
                if (path.length > 0) {
                    let cell = path.pop();
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