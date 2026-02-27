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

//My best work so far -R
function reusableMove(board, row, col, directions) {
    const piece = board[row][col];
    const moves = [];

    //loop through all possible movements
    //dc = horizontal movement, dr = vertical movement
    for(let [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;

        //while still inside the board and movement limits
        while (isInside(r,c)) {
            const target = board[r][c];
            //- if theres nothing on tiles, add and go again
            if(!target) {
                moves.push({row: r, col: c})
            } else {
                //if there is enemy, stop
                if(isEnemy(piece, target)) {
                    moves.push({row: r, col: c})
                }
                //and break out of loop
                break;
            }
            //Move once in the same direction
            r += dr;
            c += dc;
        }
    }
    return moves;
}

// ---- Piece movements
//check move legalities here
function getPawnMoves(board, row, col) {
    console.log("getting pawn moves for: ", row, col)
    const piece = board[row][col];
    const moves = [];
    //Determine direction and starting point based on whether or not piece is white
    const direction = isWhite(piece) ? -1 : 1;
    const startRow = isWhite(piece) ? 6 : 1;
    const step = row + direction;
                            //allows them to move past the startRows
    if(isInside(step, col) && !board[step][col]) {
        moves.push({row: step, col});
        const step2 = row + 2 * direction;
        //if we are at starting point, allow movement twice
        if(row === startRow) {
            moves.push({row: step2, col})
        }
    }

    //then also check for diagonal opponents
    for (let dc of [-1, 1]) {
        const r = row + direction;
        const c = col + dc;
        const target = board[r][c];

        if(!isInside(r, c)) continue;
        if(target && isEnemy(piece, target)){
            moves.push({row: r, col: c})
        }
    }

    return moves;
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
function getRookMoves(board, row, col) {
    console.log("getting rook moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1, 0], [0, -1], [-1, 0], [0, 1]
    ]);
}
function getBishopMoves(board, row, col) {
    console.log("getting bishop moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1,1], [1,-1], [-1,1], [-1,-1]
    ]);
}
function getQueenMoves(board, row, col) {
    console.log("getting queen moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1,1], [1,-1], [-1,1], [-1,-1],
        [1, 0], [0, -1], [-1, 0], [0, 1]
    ]);
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