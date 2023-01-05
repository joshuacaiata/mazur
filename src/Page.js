import React from "react"
import { useState } from "react";
import Header from "./Header/Header"
import Box from "./Maze/Box"
import Maze from "./Maze/Classes/Maze";
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import runDijkstra from "./Maze/Algorithms/Dijkstra/runDijkstra";
import runAStar from "./Maze/Algorithms/A*/runAStar";
import runBFS from "./Maze/Algorithms/BFS/runBFS";
import runDFS from "./Maze/Algorithms/DFS/runDFS";

function Page() {
    // generate board using Hunt and Kill algorithm
    let board = HuntandKill();
    
    // variable declarations, state hooks
    const [maze, setMaze] = useState(board);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Pick Algorithm");

    // function to clean the maze of any previous algorithm's data
    // does not reset the maze, just the data
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

    // function to run the selected algorithm
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

    // function to clear the maze and generate a new one
    function handleClear() {
        let newboard = HuntandKill();
        setMaze(newboard);
    }
    
    // return the header and maze components
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