import findPath from "./FindPath";
import distances from "./Distances";
import Distances from  "../../Classes/Distances";
import updatePath from "../UpdatePath";

export default function runDijkstra(maze, setMaze) {
    let frontier = [maze.rows[0].cells[0]];
    let dictobj = new Distances(maze.rows[0].cells[0]);

    function update() {
        return new Promise((resolve) => {
            if (frontier.length > 0) {

                let retval = distances(maze, frontier, dictobj);
                setMaze(retval.newmaze);
                frontier = retval.newFrontier;

                // call update function again after delay
                setTimeout(() => resolve(update()), 50);
            } else {
                resolve();
            }
        });
    }

    update().then(() => {
        let path = findPath(maze, dictobj);

        function makePath() {
            return new Promise((resolve) => {
                if (path.length > 0) {
                    let cell = path.pop();
                    // go an change onPath status of each cell, return new maze
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