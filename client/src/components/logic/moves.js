// ---- Rulesets and reusables
function isInside(row, col) {
    //inside the board limits 8x8
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

//make sure white pieces are uppercased, and also so that isEnemy can compare piece to target
function isWhite(piece){
    return piece === piece?.toUpperCase();
}
function isEnemy(piece, target) {
    if(!target) return false;
    return isWhite(piece) !== isWhite(target);
}

// ---- Piece movements

function getPawnMoves(board, row, col) {
    //check move legalities here
    console.log("getting pawn moves for: ", row, col)
    return [];
}
function getRookMoves(board, row, col) {
    console.log("getting rook moves for: ", row, col)
    return [];
}
function getKnightMoves(board, row, col) {
    console.log("getting knight moves for: ", row, col)
    const piece = board[row][col];
    const moves = [];
    //All 8 L-shaped movements for knight
    const offsets = [
        [-2,-1], [-2,1], [-1,-2], [-1,2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ]
    
    //loop through all possible movements
    //dc = horizontal movement, dr = vertical movement
    for (let [dr, dc] of offsets){
        const r = row + dr;
        const c = col + dc;

        if(!isInside(r, c)) continue;
        const target = board[r][c];
        //allows tiles that are empty or have an enemy piece and ignores friendly pieces
        if(!target || isEnemy(piece, target)){
            moves.push({row: r, col: c})
        }
    }
    return moves;
}
function getBishopMoves(board, row, col) {
    console.log("getting bishop moves for: ", row, col)
    return [];
}
function getQueenMoves(board, row, col) {
    console.log("getting queen moves for: ", row, col)
    return [];
}
function getKingMoves(board, row, col) {
    console.log("getting king moves for: ", row, col)
    return [];
}

// make the check for legal moves
export function getMoves(board, row, col) {
    const piece = board[row][col];
    if(!piece) return [];
    //create a switch check. If piece matches the letter, it returns the logic for that piece. If not, it returns an empty array.
    switch(piece.toLowerCase()) {
        case 'p': return getPawnMoves(board, row, col);
        case 'r': return getRookMoves(board, row, col);
        case 'n': return getKnightMoves(board, row, col);
        case 'b': return getBishopMoves(board, row, col);
        case 'q': return getQueenMoves(board, row, col);
        case 'k': return getKingMoves(board, row, col);
        default: return [];
    }
}

export function makeMove(board, fromSpot, to) {
    //map out current board
    const newBoard = board.map(r => [...r]);
    //get piece from "fromSpot" and move it into "to". then set null the old spot.
    newBoard[to.row][to.col] = newBoard[fromSpot.row][fromSpot.col];
    newBoard[fromSpot.row][fromSpot.col] = null;
    return newBoard;
}