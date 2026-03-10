import React from 'react';
// import rookB from "../assets/chess/lowkualityrookw.png";
// import knightB from "../assets/chess/lowkualityhorsew.png";
// import bishobB from "../assets/chess/lowkualitybishobb.png";
// import queenB from "../assets/chess/lowkualityqueenithinkb.png";
// import kingB from "../assets/chess/lowkualitykingithinkb.png";
// import pawnB from "../assets/chess/lowkualitypawnb.png";

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