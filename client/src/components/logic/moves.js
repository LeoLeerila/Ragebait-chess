// ---- RULESETS!!!! and reusables
function isInside(row, col) {
    //inside the board limits 8x8
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

//isEnemy (and other funcs) can compare piece to target OR in plainer terms: returns boolean
function isWhite(piece) {
    return piece === piece?.toUpperCase();
}
function isEnemy(piece, target) {
    if (!target) return false;
    return isWhite(piece) !== isWhite(target);
}

//My best work so far -R
function reusableMove(board, row, col, directions) {
    const piece = board[row][col];
    const moves = [];

    //loop through all possible movements
    //dc = horizontal movement, dr = vertical movement
    for (let [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;

        //while still inside the board and movement limits
        while (isInside(r, c)) {
            const target = board[r][c];
            //- if theres nothing on tiles, add and go again
            if (!target) {
                moves.push({ row: r, col: c })
            } else {
                //if there is enemy, stop
                if (isEnemy(piece, target)) {
                    moves.push({ row: r, col: c })
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

//this functions only purpose is to get coordinates of the king in a reusable manner
function getKing(board, colour) {
    const king = colour === "white" ? "K" : "k";
    //locate the mf
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] === king) {
                //return the location of the king
                return { row, col }
            }
        }
    }
    return null;
}

function isInCheck(board, colour, castlingRight) {
    const kingPos = getKing(board, colour); //return coords of our king

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (!piece) continue;
            //skip friendly pieces
            if ((colour === "white" && isWhite(piece)) || (colour === "black" && !isWhite(piece))) {
                continue;
            }
            //get potential enemy moves (getMoves() in getMoves()? Sounds fun.)
            const enemyMoves = pseudoMoves(board, row, col, castlingRight);
            //if some of them can move to the kings spot during their turn
            if (enemyMoves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
                return true;
            }
        }
    }

    return false;
}


// ---- Piece movements
//check move legalities here
function getPawnMoves(board, row, col) {
    //console.log("getting pawn moves for: ", row, col)
    const piece = board[row][col];
    const moves = [];
    //Determine direction and starting point based on whether or not piece is white
    const direction = isWhite(piece) ? -1 : 1;
    const startRow = isWhite(piece) ? 6 : 1;
    const step = row + direction;
    //allows them to move past the startRows
    if (isInside(step, col) && !board[step][col]) {
        moves.push({ row: step, col });
        const step2 = row + 2 * direction;
        //if we are at starting point, allow movement twice
        if (row === startRow) {
            moves.push({ row: step2, col })
        }
    }

    //then also check for diagonal opponents
    for (let dc of [-1, 1]) {
        const r = row + direction;
        const c = col + dc;
        const target = board[r][c];

        if (!isInside(r, c)) continue;
        if (target && isEnemy(piece, target)) {
            moves.push({ row: r, col: c })
        }
    }

    return moves;
}
function getKnightMoves(board, row, col) {
    //console.log("getting knight moves for: ", row, col)
    const piece = board[row][col];
    const moves = [];
    //All 8 L-shaped movements for knight
    const offsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ]

    //loop through all possible movements
    //dc = horizontal movement, dr = vertical movement
    for (let [dr, dc] of offsets) {
        const r = row + dr;
        const c = col + dc;

        if (!isInside(r, c)) continue;
        const target = board[r][c];
        //allows tiles that are empty or have an enemy piece and ignores friendly pieces
        if (!target || isEnemy(piece, target)) {
            moves.push({ row: r, col: c })
        }
    }
    return moves;
}
function getRookMoves(board, row, col) {
    //console.log("getting rook moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1, 0], [0, -1], [-1, 0], [0, 1]
    ]);
}
function getBishopMoves(board, row, col) {
    //console.log("getting bishop moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ]);
}
function getQueenMoves(board, row, col) {
    //console.log("getting queen moves for: ", row, col)
    return reusableMove(board, row, col, [
        [1, 1], [1, -1], [-1, 1], [-1, -1],
        [1, 0], [0, -1], [-1, 0], [0, 1]
    ]);
}
function getKingMoves(board, row, col, castleRight) {
    //console.log("getting king moves for: ", row, col)
    const piece = board[row][col];
    const moves = [];
    const whitePiece = isWhite(piece);
    const homeRow = whitePiece ? 7 : 0;
    const kingSide = whitePiece ? castleRight.K : castleRight.k;
    const queenSide = whitePiece ? castleRight.Q : castleRight.q;

    const offsets = [
        [0, 1], [1, 0], [1, 1], [1, -1],
        [-1, 1], [-1, 0], [0, -1], [-1, -1],
    ]

    for (let [dr, dc] of offsets) {
        const r = row + dr;
        const c = col + dc;

        if (!isInside(r, c)) continue;
        const target = board[r][c];
        if (!target || isEnemy(piece, target)) {
            moves.push({ row: r, col: c })
        }
    }
    //Basically if king is at his starting position and there's a clear way 
    if (row===homeRow && col === 4 && kingSide && board[homeRow][5] === null && board[homeRow][6] === null) {
        //console.log("True for: ", whitePiece ? "K" : "k")
        moves.push({
            row: homeRow,
            col: 6,
            castlingRight: whitePiece ? "K" : "k"
        });
    }
    //same for queen side
    if (row===homeRow && col === 4 && queenSide && board[homeRow][1] === null && board[homeRow][2] === null && board[homeRow][3] === null) {
        //console.log("True for: ", whitePiece ? "Q" : "q")
        moves.push({
            row: homeRow,
            col: 6,
            castlingRight: whitePiece ? "Q" : "q"
        });
    }

    return moves;
}
//turned into a function so that getMoves() and isInCheck() can use it
//ainii ja älkää tehkö tätä virhettä: mä yritin kutsua getMoves() (koska tämä kyseinen switch case) ton isInCheck() sisällä... vaikka isInCheck() on getMoves() sisällä.....
//... not my brightest moment.
function pseudoMoves(board, row, col, castlingRight) {
    const piece = board[row][col];
    if (!piece) return [];
    switch (piece.toLowerCase()) {
        case 'p': return getPawnMoves(board, row, col);
        case 'r': return getRookMoves(board, row, col);
        case 'n': return getKnightMoves(board, row, col);
        case 'b': return getBishopMoves(board, row, col);
        case 'q': return getQueenMoves(board, row, col);
        case 'k': return getKingMoves(board, row, col, castlingRight);
        default: return [];
    }
}
// make the check for legal moves
export function getMoves(board, row, col, castlingRight) {
    const piece = board[row][col];
    if (!piece) return [];

    const colour = piece === piece.toUpperCase() ? "white" : "black";
    const moves = pseudoMoves(board, row, col, castlingRight);
    console.log(moves)
    //now HERE we take out the moves that put the king in risk
    const legalMoves = moves.filter(move => {
        const simulation = makeMove(board, { row, col, }, move);
        return !isInCheck(simulation, colour, castlingRight)
    });

    return legalMoves;
}

export function makeMove(board, fromSpot, to) {
    //map out current board
    const piece = board[fromSpot.row][fromSpot.col];
    const newBoard = board.map(r => [...r]);
    //get piece from "fromSpot" and move it into "to". then set null the old spot.
    newBoard[to.row][to.col] = newBoard[fromSpot.row][fromSpot.col];
    newBoard[fromSpot.row][fromSpot.col] = null;

    //castling movements for rook
    console.log(to)
    console.log(to.castlingRight)
    if(to.castlingRight === "K") {
        newBoard[7][5] = "R";
        newBoard[7][7] = null;
    }
    if(to.castlingRight === "Q") {
        newBoard[7][3] = "R";
        newBoard[7][0] = null;
    }
    if(to.castlingRight === "k") {
        newBoard[0][5] = "r";
        newBoard[0][7] = null;
    }
    if(to.castlingRight === "q") {
        newBoard[0][3] = "r";
        newBoard[0][0] = null;
    }

    //pawn promotion (Automatic queen)
    if(piece === "P" && to.row === 0) {
        console.log("Passed!")
        newBoard[to.row][to.col] = "Q";
    }
    if ( piece === "p" && to.row === 7) {
        console.log("Passed!")
        newBoard[to.row][to.col] = "q";
    }

    return newBoard;
}