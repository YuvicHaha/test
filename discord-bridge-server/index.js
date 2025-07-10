const express = require("express");
const app = express();
app.use(express.json());

const sessions = {}; // key: { action: null, player: "Username" }

app.post("/connect", (req, res) => {
  const { key, player } = req.body;
  sessions[key] = { action: null, player };
  console.log(`[CONNECT] ${player} joined with key ${key}`);
  res.send("Connected");
});

app.post("/command", (req, res) => {
  const { key, action } = req.body;
  if (sessions[key]) {
    sessions[key].action = action;
    console.log(`[COMMAND] ${action} sent to ${key}`);
    res.send("Command received");
  } else {
    res.status(404).send("Key not found");
  }
});

app.get("/status/:key", (req, res) => {
  const key = req.params.key;
  if (sessions[key]) {
    res.json(sessions[key]);
  } else {
    res.status(404).send("Key not found");
  }
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
