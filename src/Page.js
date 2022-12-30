import Header from "./Header/Header"
import Box from "./Maze/Box"
import Maze from "./Maze/Maze"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";

function Page() {
    let board = new Maze(23, 23);
    
    const [maze, setMaze] = useState(board);

    function updateMaze() {
        console.log("updating maze")
        let newboard = HuntandKill()
        setMaze(newboard);
    }

    function handleClear() {
        let newboard = new Maze(23, 23);
        setMaze(newboard);
    }
    
    return (
        <div>
            <Header updateMaze={updateMaze} handleClear={handleClear} />
            <Box key={maze.id} maze={maze}/>
        </div>
    )
}

export default Page;