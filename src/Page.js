import Header from "./Header/Header"
import Box from "./Maze/Box"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
import runDijkstra from "./Maze/Algorithms/Dijkstra/runDijkstra";
import runAStar from "./Maze/Algorithms/A*/runAStar";
import updatePath from "./Maze/Algorithms/UpdatePath";
import bfs from "./Maze/Algorithms/BFS/BFS";
import Maze from "./Maze/Classes/Maze";

function Page() {
    let board = HuntandKill();
    
    const [maze, setMaze] = useState(board);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Pick Algorithm");

    function cleanMaze() {
        let newboard = new Maze(23, 23);

        for (let i = 0; i < newboard.rows.length; i++) {
            for (let j = 0; j < newboard.rows[i].cells.length; j++) {
                newboard.rows[i].cells[j] = maze.rows[i].cells[j];
                newboard.rows[i].cells[j].algoVisit = false;
                newboard.rows[i].cells[j].onPath = false;
            }
        }

        return newboard;
    }

    function runBFS() {
        
        let runobj = {
            newmaze: maze,
            start: maze.rows[0].cells[0],
            goal: maze.rows[maze.rows.length - 1].cells[maze.rows[0].cells.length - 1],
            queue: [],
            visited: {},
            path: []
        }

        runobj.queue.push([runobj.start]);
        runobj.visited[`${runobj.start.x},${runobj.start.y}`] = 1;
        runobj.start.algoVisit = true;

        function update() {
            return new Promise((resolve) => {
                let path = runobj.queue[0];
                let node = path[path.length - 1];
                let end = false;
                if (node === runobj.goal) { end = true; }
                if (runobj.queue.length > 0 && !end) {
                    runobj = bfs(runobj.newmaze, runobj.start, runobj.goal, runobj.queue, runobj.visited);
                    setMaze(runobj.newmaze);
                    setTimeout(() => resolve(update()), 10);
                } else {
                    resolve();
                }
            });
        }

        update().then(() => {
            let finalpath = runobj.queue[0].reverse();
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

    function updateMaze() {
        

        setMaze(cleanMaze());

        console.log("running algorithm")

        switch (selectedAlgorithm) {
            case "Dijkstra's":
                runDijkstra(maze, setMaze);
                break;
            case "A*":
                runAStar(maze, setMaze);
                break;
            case "BFS":
                runBFS();
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