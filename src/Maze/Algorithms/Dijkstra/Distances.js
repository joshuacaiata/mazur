import Maze from "../../Classes/Maze";

export default function distances(maze, frontier, distances) {
    let newFrontier = []; // initialize new frontier
    let newmaze = new Maze(23, 23);

    for (let i = 0; i < 23; i++) {
        for (let j = 0; j < 23; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }
    
    for (let i = 0; i < frontier.length; i++) { // loop over frontier
        let cell = frontier[i];
        cell.algoVisit = true; // mark cell as visited

        let links = cell.linked;

        for (let j = 0; j < links.length; j++) {
            let linked = links[j];
            linked.algoVisit = true;

            // for all linked cells to the frontier
            // if they are not already visited, then add them
            // to the new frontier
            if (distances.getDistance(linked) === -1) {
                let dist = distances.getDistance(cell) + 1; 
                distances.setDistance(linked, dist);
                newFrontier.push(linked);
            }
        }
    }


    return {newmaze, newFrontier, distances};
}