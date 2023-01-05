import Header from "./Header/Header"
import Box from "./Maze/Box"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
import runDijkstra from "./Maze/Algorithms/Dijkstra/runDijkstra";
import runAStar from "./Maze/Algorithms/A*/runAStar";
import runBFS from "./Maze/Algorithms/BFS/runBFS";
import runDFS from "./Maze/Algorithms/DFS/runDFS";
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

    function updateMaze() {

        setMaze(cleanMaze());

        switch (selectedAlgorithm) {
            case "Dijkstra's":
                runDijkstra(maze, setMaze);
                break;
            case "A*":
                runAStar(maze, setMaze);
                break;
            case "BFS":
                runBFS(maze, setMaze);
                break;
            case "DFS":
                runDFS(maze, setMaze);
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