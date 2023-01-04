import React, { useState } from "react";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlay } from '@fortawesome/free-solid-svg-icons';

function Header({ updateMaze, handleClear, selectedAlgorithm, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);

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
                        <a to="#" onClick={() => setSelected("Dijkstra's")}>
                            Dijkstra's Algorithm
                        </a>
                        <a to="#" onClick={() => setSelected("A*")}>
                            A*
                        </a>
                        <a to="#" onClick={() => setSelected("BFS")}>
                            Breadth-First Search
                        </a>
                        <a to="#" onClick={() => setSelected("DFS")}>
                            Depth-First Search
                        </a>
                    </div>
                )}
                </div>
            </div>
            <div className={classes.right}>
                <a 
                    to="#" 
                    className={classes.run}
                    onClick={updateMaze}
                >
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
                    onClick={handleClear}>
                    Reset Maze
                </a>
            </div>
        </div>
    );
}

export default Header;
