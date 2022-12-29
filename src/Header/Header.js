import React, { useState } from "react";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlay } from '@fortawesome/free-solid-svg-icons';
import Box from "../Maze/Box";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Pick Algorithm");

    return (
        <div className={classes.header}>
            <div className={classes.left}>
                <div className={classes.title}>Mazur</div>
                <div className={classes.dropdown}>
                <button
                    className={classes.dropbutton}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Choose Algorithm
                    <span className={classes.icon}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                </button>
                {isOpen && (
                    <div className={classes.dropdownContent}>
                        <a 
                            href="#"
                            onClick={() => setSelectedAlgorithm("Djikstra's")}>
                            Dijkstra's Algorithm
                        </a>
                        <a 
                            href="#"
                            onClick={() => setSelectedAlgorithm("A*")}>
                            A*
                        </a>
                        <a 
                            href="#"
                            onClick={() => setSelectedAlgorithm("BFS")}>
                            Breadth-First Search
                        </a>
                        <a 
                            href="#"
                            onClick={() => setSelectedAlgorithm("DFS")}>
                            Depth-First Search
                        </a>
                    </div>
                )}
                </div>
            </div>
            <div className={classes.right}>
                <a href="#" className={classes.run}>
                    <div className={classes.righttext}>
                        {selectedAlgorithm 
                            === "Pick Algorithm" 
                            ? "Pick Algorithm" 
                            : `Run ${selectedAlgorithm}`}
                    </div>
                    <span className={classes.iconplay}>
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                </a>
                <a 
                    href="#"
                    className={classes.reset}
                    onClick={() => setSelectedAlgorithm("Pick Algorithm")}>
                    Clear Maze
                </a>
            </div>

        </div>
    );
}

export default Header;
