const connectDB = require("./config/db");
const express = require("express");
const aiPresetRouter = require("./routes/aiPresetRouter");
const playerRouter = require("./routes/playerRouter");
const savegameRouter = require('./routes/savegameRouter');
const settingsRouter = require('./routes/settingsRouter');
const statsRouter = require("./routes/statsRouter");

const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
  
// express app
const app = express();

connectDB();
 
// middleware
app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes

app.use("/api/aipreset", aiPresetRouter);
app.use("/api/player", playerRouter);
app.use("/api/savegame", savegameRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/stats", statsRouter);



app.use(unknownEndpoint);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
