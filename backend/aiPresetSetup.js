const AiPreset = require('./models/aiPresetModel');
const connectDB = require('./config/db');
const mongoose = require('mongoose')

connectDB();

const presetSeed = [
    {
        aiName: "Evil Larry",
        systemPrompt: "BE EVIL NOW!",
        aiPic: "/path/to/pfp.png.jpg.pdf.exe",
        aiELO: 1234,
        aiDescription: "Evil Larry is evil :)"
    },
    {
        aiName: "Good Larry",
        systemPrompt: "BE GOOD NOW!",
        aiPic: "/path/to/pfp.png",
        aiELO: 11,
        aiDescription: "Good Larry is good :("
    }
]

const Setup = async (presetSeed) => {
    await AiPreset.deleteMany({});
    await AiPreset.insertMany(presetSeed);
    mongoose.connection.close();
}

Setup(presetSeed)
