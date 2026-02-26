const {generateMove} = require("../promts/movePromt");
const {normalizeMove} = require("../utils/normalizeMove");
async function generateMoveText(req,res) {
    //whole body of this funtion is made for test purposes, will be made right later

    try{
        const {txt} = req.body;

        const rawRes = await generateMove(txt)

        const jsonMatch = rawRes.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : rawRes;
        if (process.env.DEBUG_GEMINI === "true") {
        console.log(jsonString);
        }
        const normalizedMove = normalizeMove(jsonString);
        res.json(normalizedMove);

        } catch (err) {
        console.error("Error in aiMoveController:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }

}

module.exports = generateMoveText;