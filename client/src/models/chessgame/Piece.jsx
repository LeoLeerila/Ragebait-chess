import React from 'react';

const Piece = ({ piece }) => {
    // https://www.w3schools.com/charsets/ref_utf_cards.asp <- sieltä kopsattu
    const pieceMap = {
        r: "♜",
        n: "♞",
        b: "♝",
        q: "♛",
        k: "♚",
        p: "♟",
        R: "♖",
        N: "♘",
        B: "♗",
        Q: "♕",
        K: "♔",
        P: "♙"
    };
    return <span className="piece">{pieceMap[piece]}</span>;
};

export default Piece;