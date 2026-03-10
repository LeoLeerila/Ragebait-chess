const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Player = require("../models/playerModel");

const signupUrl = "/api/player/signup"
const settingsUrl = "/api/settings/"

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

describe("GET /api/settings/", () => {
    describe("valid token", () => {
        it("should return json format and http 200", async () => {
            await api
                .get(settingsUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return default value", async () => {
            const response = await api
                .get(settingsUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body.boardStyle).toBe("GoldenCommon")
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 401", async () => {
            await api
                .get(settingsUrl)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("PATCH /api/settings/", () => {
    describe("valid token", () => {
        it("should return json format and http 200 for full update", async () => {
            const updateSettings = {
                "boardStyle": "Nick Fury",
                "theme": true,
                "profilePic": "path/to/pfp.png",
                "showProfileStats": {
                    "ShowElo": true,
                    "ShowWL": true,
                    "ShowDate": true
                }
            }

            await api
                .patch(settingsUrl + "update")
                .send(updateSettings)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return json format and http 200 for partial update", async () => {
            const updateSettings = {
                "boardStyle": "Nick Fury",
                "theme": false
            }

            await api
                .patch(settingsUrl + "update")
                .send(updateSettings)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should update player info", async () => {
            const updateSettings = {
                "boardStyle": "Nick Fury",
                "theme": true,
                "profilePic": "path/to/pfp.png",
                "showProfileStats": {
                    "ShowElo": true,
                    "ShowWL": true,
                    "ShowDate": true
                }
            }

            const response = await api
                .patch(settingsUrl + "update")
                .send(updateSettings)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            const newplayer = await api
                .get(settingsUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body.boardStyle).toBe(updateSettings.boardStyle)
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 400", async () => {
            const updateSettings = {
                "boardStyle": "Nick Fury",
                "theme": true,
                "profilePic": "path/to/pfp.png",
                "showProfileStats": {
                    "ShowElo": true,
                    "ShowWL": true,
                    "ShowDate": true
                }
            }

            await api
                .patch(settingsUrl + "update")
                .send(updateSettings)
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