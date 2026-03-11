const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const AiPreset = require("../models/aiPresetModel");

const aiPresetUrl = "/api/aipreset/"

const aiPresetSeed = [
    {
        aiName: "Evil Larry",
        systemPrompt: "BE EVIL NOW!",
        aiPic: "/path/to/pfp.png.jpg.pdf.exe",
        aistats: {
            ELO: 1234,
            Depth: 10,
            Skill: 1
        },
        aiDescription: "Evil Larry is evil :)"
    },
    {
        aiName: "Good Larry",
        systemPrompt: "BE GOOD NOW!",
        aiPic: "/path/to/pfp.png",
        aistats: {
            ELO: 1234,
            Depth: 10,
            Skill: 1
        },
        aiDescription: "Good Larry is good :("
    }
]

describe("GET /api/aipreset/", () => {

    beforeEach(async () => {
        await AiPreset.deleteMany({});
        await AiPreset.create(aiPresetSeed)
    });

    it("should return json format and http 200", async () => {
        await api
            .get(aiPresetUrl)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should return all presets", async () => {
        const response = await api
            .get(aiPresetUrl)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toHaveLength(aiPresetSeed.length)
    });
});

describe("GET /api/aipreset/:aiPresetId", () => {

    beforeEach(async () => {
        await AiPreset.deleteMany({});
        await AiPreset.create(aiPresetSeed)
    });

    it("should return json format and http 200", async () => {
        await api
            .get(aiPresetUrl)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });
});


// Close DB connection once after all tests
afterAll(async () => {
    await mongoose.connection.close();
});