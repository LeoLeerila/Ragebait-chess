const model = require("../config/gemini.js");


// params: fen, currentMoves, history, blockedPieces, playerAns
async function generateMove(playerAns, botBoard){
    // HERE THE PROMPT
    const prompt = `You are Chess player of ${botBoard.botElo} ELO rating and playing as ${botBoard.botChessC}, chessboard is in FEN format of ${botBoard.fen}.
    Generate a **structured answer and move** in **JSON format**.
    ### **Schema Requirements**:
    The JSON response should have the following structure:
    {
      "botMove": "Chess move which you are going to move in FEN format",
      "botAnswer": "Comment about the player comment and move"
    }
    ### Player comment to you:
      Player said to you ${playerAns}
    ### Instructions:
    - Do not include extra fields outside of the schema.
    - Return only valid JSON.`;

    //this for testing purpose
    //const prompt = playerAns

    try {
    const result = await model(prompt);

    if (process.env.DEBUG_GEMINI === "true") {
      console.log("Raw Gemini response:", result);
    }

    return result.text;
  } catch (err) {
    console.error("Error in MOVE:", err);
    throw new Error("Failed to generate move");
  }
};

module.exports = {generateMove};