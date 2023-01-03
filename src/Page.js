import Header from "./Header/Header"
import Box from "./Maze/Box"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
import findPath from "./Maze/Algorithms/Dijkstra/FindPath";
import distances from "./Maze/Algorithms/Dijkstra/Distances";
import Distances from "./Maze/Classes/Distances";
import updatePath from "./Maze/Algorithms/UpdatePath";

function Page() {
    let board = HuntandKill();
    
    const [maze, setMaze] = useState(board);

    function updateMaze() {
        let frontier = [maze.rows[0].cells[0]];
        let dictobj = new Distances(maze.rows[0].cells[0]);
    
        function update() {
            return new Promise((resolve) => {
                if (frontier.length > 0) {
                    let retval = distances(maze, frontier, dictobj);
                    setMaze(retval.newmaze);
                    frontier = retval.newFrontier;
                    setTimeout(() => resolve(update()), 50); // call update function again after delay
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
    

    function handleClear() {
        let newboard = HuntandKill();
        setMaze(newboard);
    }
    
    return (
        <div>
            <Header updateMaze={updateMaze} handleClear={handleClear} />
            <Box maze={maze}/>
        </div>
    )
}

export default Page;