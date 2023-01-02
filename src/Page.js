import Header from "./Header/Header"
import Box from "./Maze/Box"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
import Dijkstra from "./Maze/Algorithms/Dijkstra";

function Page() {
    let board = HuntandKill();
    
    const [maze, setMaze] = useState(board);

    function updateMaze() {
        console.log("updating maze")
        let newboard = Dijkstra(maze);
        setMaze(newboard);
    }

    function handleClear() {
        let newboard = HuntandKill();
        setMaze(newboard);
        console.log("clearing maze")
    }
    
    return (
        <div>
            <Header updateMaze={updateMaze} handleClear={handleClear} />
            <Box maze={maze}/>
        </div>
    )
}

export default Page;