import Header from "./Header/Header"
import Box from "./Maze/Box"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
import findPath from "./Maze/Algorithms/Dijkstra/FindPath";
import distances from "./Maze/Algorithms/Dijkstra/Distances";
import Distances from "./Maze/Classes/Distances";
import updatePath from "./Maze/Algorithms/UpdatePath";
import AStar from "./Maze/Algorithms/A*/AStar";

function Page() {
    let board = HuntandKill();
    
    const [maze, setMaze] = useState(board);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Pick Algorithm");

    function runDijkstra() {
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

    function runAStar() {
        
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


    function updateMaze() {
        switch (selectedAlgorithm) {
            case "Dijkstra's":
                runDijkstra();
                break;
            case "A*":
                runAStar();
                break;
            default:
                console.log("Invalid algorithm");
        }
    }

    function handleClear() {
        let newboard = HuntandKill();
        setMaze(newboard);
    }
    
    return (
        <div>
            <Header 
                updateMaze={updateMaze} 
                handleClear={handleClear} 
                selectedAlgorithm={selectedAlgorithm}
                setSelected={setSelectedAlgorithm}/>
            <Box maze={maze}/>
        </div>
    )
}

export default Page;