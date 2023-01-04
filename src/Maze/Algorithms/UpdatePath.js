import Maze from "../Classes/Maze";

export default function updatePath(maze, x, y) {
    let newmaze = new Maze(23, 23);

    for (let i = 0; i < 23; i++) {
        for (let j = 0; j < 23; j++) {
            newmaze.rows[i].cells[j] = maze.rows[i].cells[j];
        }
    }

    newmaze.rows[y].cells[x].onPath = true;
    
    return newmaze;
}