import Header from "./Header/Header"
import Box from "./Maze/Box"
import Maze from "./Maze/Maze"
import HuntandKill from "./Maze/Algorithms/HuntandKill"
import React from "react"
import { useState } from "react";
/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/

function Page() {
    let board = HuntandKill;
    
    const [maze, setMaze] = useState(board);

    function updateMaze() {
        console.log("updating maze")
        let newboard = HuntandKill()
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