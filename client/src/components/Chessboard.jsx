import React, { useState } from "react";
import Square from "./Square";
import { coordsToAlg } from "./logic/helps";

const Chessboard = ({ board, squareClick, selected }) => {
    return (
        <div className="chess-board">
            {board.map((row, rowIndex) => (
                row.map((piece, colIndex) => {
                    const sqrName = coordsToAlg(rowIndex, colIndex);
                    return (
                        <Square
                            key={sqrName}
                            square={sqrName}
                            row={rowIndex}
                            col={colIndex}
                            piece={piece}
                            onClick={squareClick}
                            isSelected={
                                selected &&
                                selected.row === rowIndex &&
                                selected.col === colIndex
                            }
                        />
                    )
                })
            ))}
        </div>
    )
}

export default Chessboard;