const model = require("../config/gemini.js");


// params: fen, currentMoves, history, blockedPieces
async function generateMove(txt){
    // HERE THE PROMPT
    //const prompt = ``

    //this for testing purpose
    const prompt = txt

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