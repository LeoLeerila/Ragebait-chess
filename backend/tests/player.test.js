const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Player = require("../models/playerModel");

const signupUrl = "/api/player/signup"
const loginUrl = "/api/player/login"

// new test player signup form
const signupForm = [
    {
        "playerName": "Kaiffari",
        "password": "Xf1&8opq",
        "email": "kaiffari@kaiffaritOY1.fi"
    }, {
        "playerName": "Kalle",
        "password": "Xf1&8opq",
        "email": "kaiffari@kaiffaritOY3.fi"
    }
]

// new test player login form
const loginForm = [
    {
        "password": "Xf1&8opq",
        "email": "kaiffari@kaiffaritOY1.fi"
    }, {
        "password": "Xf1&8opq",
        "email": "kaiffari@kaiffaritOY3.fi"
    }
]

//cleanup
beforeEach(async () => {
    await Player.deleteMany({});
});

describe("POST /api/player/signup", () => {
    describe("valid payload", () => {
        it("should return json format and http 200", async () => {
            const newPlayer = signupForm[0]

            await api
                .post(signupUrl)
                .send(newPlayer)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should save the new player to db", async () => {
            const playersOld = await Player.find({})
            const newPlayer = signupForm[0]

            await api
                .post(signupUrl)
                .send(newPlayer)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            const playersNew = await Player.find({})
            expect(playersNew.length).toEqual(playersOld.length + 1)
        });

        it("should return playername and token", async () => {
            const newPlayer = signupForm[0]

            const response = await api
                .post(signupUrl)
                .send(newPlayer)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveProperty("email")
            expect(response.body).toHaveProperty("token")
        });

        it("should return http 400 for duplicate email", async () => {
            const newPlayer = signupForm[0]
            const duplicatePlayer = signupForm[0]

            await api
                .post(signupUrl)
                .send(newPlayer)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            await api
                .post(signupUrl)
                .send(duplicatePlayer)
                .expect(400)
                .expect("Content-Type", /application\/json/);

        });
    });

    describe("invalid payload", () => {
        it("should return json format and http 400", async () => {
            const invalidPlayer = {
                "password": "Xf1&8opq",
                "email": "kaiffari@kaiffaritOY1.fi"
            }

            await api
                .post(signupUrl)
                .send(invalidPlayer)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        });

        it("should not save the invalid player to db", async () => {
            const playersOld = await Player.find({})
            const invalidPlayer = {
                "password": "Xf1&8opq",
                "email": "kaiffari@kaiffaritOY1.fi"
            }

            await api
                .post(signupUrl)
                .send(invalidPlayer)
                .expect(400)
                .expect("Content-Type", /application\/json/);

            const playersNew = await Player.find({})
            expect(playersNew.length).toEqual(playersOld.length)
        });
    });
});

describe("POST /api/player/login", () => {

    // Sign up a player before each login test
    beforeEach(async () => {
        await api.post("/api/player/signup").send(signupForm[0]);
    });

    describe("valid payload", () => {
        it("should return json format and http 200", async () => {
            const playerLogin = loginForm[0]

            await api
                .post(loginUrl)
                .send(playerLogin)
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        it("should return playername and token", async () => {
            const playerLogin = loginForm[0]

            const response = await api
                .post(loginUrl)
                .send(playerLogin)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveProperty("email")
            expect(response.body).toHaveProperty("token")
        });
    });

    describe("invalid payload", () => {
        it("should return json format and http 400 with incorrect password", async () => {
            const invalidPlayer = loginForm[1]

            await api
                .post(signupUrl)
                .send(invalidPlayer)
                .expect(400)
        });

        it("should return json format and http 400 with incorrect playername", async () => {
            const invalidPlayer = loginForm[1]

            await api
                .post(signupUrl)
                .send(invalidPlayer)
                .expect(400)
        });
    });
});

// Close DB connection once after all tests
afterAll(async () => {
    await mongoose.connection.close();
});