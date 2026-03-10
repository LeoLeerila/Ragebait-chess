import React, { useState } from "react";
import Square from "./Square";
import { coordsToAlg } from "./logic/helps";

const Chessboard = ({ board, squareClick, selected, playAsBlack }) => {
    //fuck my fucking chungus life
    //had to manually assign the order of indexes in case player plays as black
    //because im a giga genius who designed the moves based on player being white (ONLY)
    const rows = playAsBlack === "black" ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
    const cols = playAsBlack === "black" ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];

    return (
        <div className="chess-board">
            {rows.map((row) => (
                cols.map((col) => {
                    const piece = board[row][col];
                    const sqrName = coordsToAlg(row, col);
                    return (
                        <Square
                            key={sqrName}
                            square={sqrName}
                            row={row}
                            col={col}
                            piece={piece}
                            onClick={squareClick}
                            isSelected={
                                selected &&
                                selected.row === row &&
                                selected.col === col
                            }
                        />
                    )
                })
            ))}
        </div>
    )
}

export default Chessboard;