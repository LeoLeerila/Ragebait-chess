const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Player = require("../models/playerModel");

const signupUrl = "/api/player/signup"
const PlayerUrl = "/api/player/"

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

describe("GET /api/player/", () => {
    describe("valid token", () => {
        it("should return json format and http 200", async () => {
            await api
                .get(PlayerUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return playername and email", async () => {
            const response = await api
                .get(PlayerUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body.playerName).toBe(newPlayer.playerName)
            expect(response.body.email).toBe(newPlayer.email)
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 401", async () => {
            await api
                .get(PlayerUrl)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("PATCH /api/player/", () => {
    describe("valid token", () => {
        it("should return json format and http 200 for full update", async () => {
            const updatePlayer = {
                "playerName": "Kaiffari2",
                "password": "Xf1&8opq2",
                "email": "kaiffari@kaiffaritOY2.fi"
            }

            await api
                .patch(PlayerUrl)
                .send(updatePlayer)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return json format and http 200 for partial update", async () => {
            const updatePlayer = {
                "playerName": "Kaiffari2",
                "email": "kaiffari@kaiffaritOY2.fi"
            }

            await api
                .patch(PlayerUrl)
                .send(updatePlayer)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return player name and email", async () => {
            const updatePlayer = {
                "playerName": "Kaiffari2",
                "email": "kaiffari@kaiffaritOY2.fi"
            }

            const response = await api
                .patch(PlayerUrl)
                .send(updatePlayer)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body.playerName).toBe(updatePlayer.playerName)
            expect(response.body.email).toBe(updatePlayer.email)
        });

        it("should update player info", async () => {
            const updatePlayer = {
                "playerName": "Kaiffari2",
                "email": "kaiffari@kaiffaritOY2.fi"
            }

            const response = await api
                .patch(PlayerUrl)
                .send(updatePlayer)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body.playerName).toBe(updatePlayer.playerName)
            expect(response.body.email).toBe(updatePlayer.email)

            const newplayer = await api
                .get(PlayerUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(newplayer.body.playerName).toBe(updatePlayer.playerName)
            expect(newplayer.body.email).toBe(updatePlayer.email)
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 400", async () => {
            const updatePlayer = {
                "playerName": "Kaiffari2",
                "email": "kaiffari@kaiffaritOY2.fi"
            }

            await api
                .patch(PlayerUrl)
                .send(updatePlayer)
                .set("Authorization", "Bearer " + "invalidtoken")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        });
    });
});

describe("DELETE /api/player/", () => {
    describe("valid token", () => {
        it("should return json format and http 200", async () => {
            await api
                .delete(PlayerUrl)
                .set("Authorization", "Bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });
    });

    describe("invalid token", () => {
        it("should return json format and http 400", async () => {
            await api
                .delete(PlayerUrl)
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