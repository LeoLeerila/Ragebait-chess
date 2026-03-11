//coordinates of a single tile ( goes from example: 6,4 -> e2 )
export function coordsToAlg(row, col) {
    const tiles = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rank = 8 - row;
    const tile = tiles[col];
    return `${tile}${rank}`
}

//does the reverse
export function algToCoords(square) {
    const tiles = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const tile = square[0];
    const rank = parseInt(square[1]);
    const col = tiles.indexOf(tile);
    const row = 8 - rank;
    return { row, col}
}

export function boardToFen(board, turn, castlingRight) {
    let result = "";
    //left -> right, top to bottom
    for(let row = 0; row < 8; row++) {
        let empty = 0;
        for(let col= 0; col < 8; col++) {
            const piece = board[row][col];
            if(piece === null) {
                empty++;
            } else {
                if (empty > 0) {
                    result += empty.toString();
                    empty = 0;
                }
               result += piece; //should be ok because board usestate already has upper and lower capital letters
            }
        }
        if(empty > 0) result += empty.toString();
        if (row < 7) result += '/';
    }
    let t = turn === "white" ? "w" : "b";
    let castling = "";
    console.log(castlingRight)
    if (castlingRight.K) castling += "K";
    if (castlingRight.Q) castling += "Q";
    if (castlingRight.k) castling += "k";
    if (castlingRight.q) castling += "q";
    if (castling === "") castling = "-";
    
    result +=  ` ${t} ${castling} - 0 1`;
    return result;
}