const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");
const SaveGame = require("../models/savegameModel");

const dotenv = require('dotenv');
dotenv.config();

const signupUrl = "/api/player/signup"
const savegameUrl = "/api/savegame/"

// read all savegames from the DB
const savegamesInDb = async () => {
    const allsavegames = await SaveGame.find({});
    return allsavegames.map((savegame) => savegame.toJSON());
};

const savegameSeed = [
        {
            "playerColor": "White",
            "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "moveHistory": "this should be an array but string works for tests",
            "board": "GoldenCommon",
            "chatHistory": "this should be an array but string works for tests",
            "aiPresetId": "evil larry id :)"
        },
        {
            "playerColor": "Black",
            "boardState": "r1b1k3/ppp1np2/2n2qpr/2Q1p2p/4P2P/2P4N/PP2BPP1/RN2K2R w KQq - 0 10",
            "moveHistory": "this should also be an array but string works for tests",
            "board": "Rare",
            "chatHistory": "this should also be an array but string works for tests",
            "aiPresetId": "good larry id :("
        }
    ]

//test player signup form
const newPlayer = {
    "playerName": "Kaiffari",
    "password": "Xf1&8opq",
    "email": "kaiffari@kaiffaritOY1.fi"
}

// get test player token
let token
beforeAll(async () => {
    await Player.deleteMany({})


    const response = await api
        .post(signupUrl)
        .send(newPlayer)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    token = response.body.token
});

describe("GET /api/savegame/", () => {

    beforeEach(async () => {
        await SaveGame.deleteMany({});
        await Promise.all(
            savegameSeed.map((savegame) =>
                api
                    .post(savegameUrl)
                    .set("Authorization", "Bearer " + token)
                    .send(savegame)
            )
        );
    });

    describe("valid token", () => {
        it("should return json format and http 200", async () => {
            await api
                .get(savegameUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return all savegames", async () => {
            const response = await api
                .get(savegameUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveLength(savegameSeed.length)
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 401", async () => {
            await api
                .get(savegameUrl)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("GET /api/savegame/:savegameId", () => {

    beforeEach(async () => {
        await SaveGame.deleteMany({});
        await Promise.all(
            savegameSeed.map((savegame) =>
                api
                    .post(savegameUrl)
                    .set("Authorization", "Bearer " + token)
                    .send(savegame)
            )
        );
    });

    describe("valid token", () => {
        it("should return json format and http 200", async () => {
            const savegames = await savegamesInDb()
            await api
                .get(savegameUrl + savegames[0]._id)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return json format and http 400 for invalid id", async () => {
            const response = await api
                .get(savegameUrl + "invalidId")
                .set("Authorization", "Bearer " + token)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 401", async () => {
            const savegames = await savegamesInDb()
            await api
                .get(savegameUrl + savegames[0]._id)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("POST /api/savegame/", () => {

    beforeEach(async () => {
        await SaveGame.deleteMany({});
        await Promise.all(
            savegameSeed.map((savegame) =>
                api
                    .post(savegameUrl)
                    .set("Authorization", "Bearer " + token)
                    .send(savegame)
            )
        );
    });

    describe("valid token", () => {
        it("should return json format and http 201", async () => {
            const newSavegame = {
                "playerColor": "White",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            await api
                .post(savegameUrl)
                .send(newSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(201)
                .expect("Content-Type", /application\/json/);
        });

        it("should save new savegame to db", async () => {
            const savegamesOld = await savegamesInDb()
            const newSavegame = {
                "playerColor": "White",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            await api
                .post(savegameUrl)
                .send(newSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const savegamesNew = await savegamesInDb()
            expect(savegamesNew).toHaveLength(savegamesOld.length + 1)
        });

        it("should return http 500 with missing parameters", async () => {
            const newSavegame = {
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            const response = await api
                .post(savegameUrl)
                .send(newSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        });

        it("should not save savegame to db with missing parameters", async () => {
            const savegamesOld = await savegamesInDb()
            const newSavegame = {
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            const response = await api
                .post(savegameUrl)
                .send(newSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(400)
                .expect("Content-Type", /application\/json/);

            const savegamesNew = await savegamesInDb()
            expect(savegamesNew).toHaveLength(savegamesOld.length)
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 401", async () => {
            const newSavegame = {
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }
            await api
                .post(savegameUrl)
                .send(newSavegame)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("PATCH /api/savegame/:savegameId", () => {

    beforeEach(async () => {
        await SaveGame.deleteMany({});
        await Promise.all(
            savegameSeed.map((savegame) =>
                api
                    .post(savegameUrl)
                    .set("Authorization", "Bearer " + token)
                    .send(savegame)
            )
        );
    });

    describe("valid token", () => {
        it("should return json format and http 200 for full update", async () => {
            const savegamesOld = await savegamesInDb()
            const updateSavegame = {
                "playerColor": "Black",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            await api
                .patch(savegameUrl + savegamesOld[0]._id)
                .send(updateSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return json format and http 200 for partial update", async () => {
            const savegamesOld = await savegamesInDb()
            const updateSavegame = {
                "playerColor": "Black",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            }

            await api
                .patch(savegameUrl + savegamesOld[0]._id)
                .send(updateSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should update player info", async () => {
            const savegamesOld = await savegamesInDb()
            const updateSavegame = {
                "playerColor": "Black",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            }

            const response = await api
                .patch(savegameUrl + savegamesOld[0]._id)
                .send(updateSavegame)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            const updatedSavegame = await api
                .get(savegameUrl + response.body._id)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(updatedSavegame.body.boardState).toBe("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 400", async () => {
            const updateSavegame = {
                "playerColor": "White",
                "boardState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "moveHistory": "this should be an array but string works for tests",
                "board": "GoldenCommon",
                "chatHistory": "this should be an array but string works for tests",
                "aiPresetId": "evil larry id :)"
            }

            await api
                .patch(savegameUrl)
                .send(updateSavegame)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});


// Close DB connection once after all tests
afterAll(async () => {
    await mongoose.connection.close();
});