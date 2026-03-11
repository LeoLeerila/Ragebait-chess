const model = require("../config/gemini.js");


// params: fen, currentMoves, history, blockedPieces, playerAns
async function generateMove(playerAns, botBoard, botPreset){
    // HERE THE PROMPT
    const prompt = `You are ${botPreset.info} who is a Chess player of ${botPreset.botElo} ELO rating and playing as ${botBoard.botChessC}, chessboard is in FEN format of ${botBoard.fen} and your move is ${botBoard.currentMoves}.
    Generate a **structured answer** in **JSON format**.

    ### **Schema Requirements**:
    The JSON response should have the following structure:
    {
      "answer": "Answer to player comment and/or something in character"
    }
    ### Player comment to you:
      Player said to you ${playerAns}

    ### Chat history:
      Chat history is in a objects in array and if "isLLMAnswer":"true" the "answer" in same object is your answer, if "isLLMAnswer":"false" the "Answer" in same object is Player answer.
      Chat history array:${JSON.stringify(botBoard.history)}
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