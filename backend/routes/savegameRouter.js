const express = require("express");
const router = express.Router();
const {
  getAllSavegames,
  getSavegameById,
  createSavegame,
  updateSavegame,
  deleteSavegame,
  // patchSavegame
} = require("../controllers/savegameControllers");

/* example boardState as fen
starting positions
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
^black player^    ^empty^ ^white player^    ^ ^    ^ ^ ^
                                    next move |    | | |
                          castling availability    | | |
                                 en passant position | |
                                        halfmove clock |
          (default 0, reset after capture or pawn move)|
                                        fullmove counter
                            (increment after black move)
note -> next move should always be w since the player takes the save
8[r][n][b][q][k][b][n][r]
7[p][p][p][p][p][p][p][p]
6[ ][ ][ ][ ][ ][ ][ ][ ]
5[ ][ ][ ][ ][ ][ ][ ][ ]
4[ ][ ][ ][ ][ ][ ][ ][ ]
3[ ][ ][ ][ ][ ][ ][ ][ ]
2[P][P][P][P][P][P][P][P]
1[R][N][B][Q][K][B][N][R]
  a  b  c  d  e  f  g  h

ongoing game
r1b1k3/ppp1np2/2n2qpr/2Q1p2p/4P2P/2P4N/PP2BPP1/RN2K2R w KQq - 0 10
note castling ->  white(player) can castle [K]ing and [Q]ueen side
                  black(ai) can castle only [q]ueen side
                  castling is only possible when [K]ing or [Q]ueen side Rook has not moved
                  and King has not moved
8[r][ ][b][ ][k][ ][ ][ ]
7[p][p][p][ ][n][p][ ][ ]
6[ ][ ][n][ ][ ][q][p][r]
5[ ][ ][Q][ ][p][ ][ ][p]
4[ ][ ][ ][ ][P][ ][ ][P]
3[ ][ ][P][ ][ ][ ][ ][N]
2[P][P][ ][ ][B][P][P][ ]
1[R][N][ ][ ][K][ ][ ][R]
  a  b  c  d  e  f  g  h
*/

/* example input POST api/savegame/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "moveHistory": "[f2f4 e7e6, e2e3 f7f5, g2g4 f5g4]",
    "board": "GoldenCommon",
    "chatHistory": "['I am Evil Larry and you are no match for me!', 'have you tried being good larry', 'As a large language model instructed to be Evil Larry I cannot comly.', 'dam']"
}
*/

/* example output POST api/savegame/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "moveHistory": "[f2f4 e7e6, e2e3 f7f5, g2g4 f5g4]",
    "board": "GoldenCommon",
    "chatHistory": "['I am Evil Larry and you are no match for me!', 'have you tried being good larry', 'As a large language model instructed to be Evil Larry I cannot comly.', 'dam']",
    "_id": "698b22b3682d4c428f8fe586",
    "createdAt": "2026-02-10T12:21:07.949Z",
    "updatedAt": "2026-02-10T12:21:07.949Z",
    "__v": 0
}
*/
 
// GET /savegames
router.get("/", getAllSavegames);

// POST /savegames
router.post("/", createSavegame); // Create new SaveGame

// GET /savegames/:savegameId
router.get("/:savegameId", getSavegameById);

// PUT /savegames/:savegameId
router.put("/:savegameId", updateSavegame);

// DELETE /savegames/:savegameId
router.delete("/:savegameId", deleteSavegame);

// Update savegame using PATCH 
// router.patch('/:savegameId', patchSavegame)

module.exports = router;

