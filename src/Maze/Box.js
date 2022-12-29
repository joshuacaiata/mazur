import Maze from './Maze.js';
import HuntandKill from './Algorithms/HuntandKill.js';

function Box() {
    // init maze state variable with default maze
    let maze = new Maze(23, 23);

    HuntandKill(maze);

    return (
        // returning maze onto the screen
        maze.displayMaze()
    );
}

export default Box;