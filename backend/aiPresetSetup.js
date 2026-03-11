const AiPreset = require('./models/aiPresetModel');
const connectDB = require('./config/db');
const mongoose = require('mongoose')
import larry from "../assets/larry.png"
import randy from "../assets/randy.jpg"
connectDB();

const presetSeed = [
    {
        aiName: "Evil Larry",
        systemPrompt: "A temperamental, evil cat overlord known as Larry.",
        aiPic: larry,
        aistats: {
            ELO: 1800,
            Depth: 4,
            Skill: 16
        },
        aiDescription: "Evil Larry is evil :)"
    },
    {
        aiName: "Good Larry",
        systemPrompt: "good cat overlord known as Larry.",
        aiPic: randy,
        aistats: {
            ELO: 1234,
            Depth: 5,
            Skill: 15
        },
        aiDescription: "Good Larry is good :("
    }
]

const Setup = async (presetSeed) => {
    await AiPreset.deleteMany({});
    await AiPreset.insertMany(presetSeed);
    mongoose.connection.close();
}

Setup(presetSeed)
