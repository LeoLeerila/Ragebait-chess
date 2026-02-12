import React, { useState } from "react";
import Square from "./Square";

const Chessboard = ({ board }) => {
    return (
        <div className="chess-board">
            {board.map((row, rowIndex) => (
                row.map((piece, colIndex) => (
                    <Square 
                        key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        piece={piece}
                    />
                ))
            ))}
        </div>
    )
}

export default Chessboard;