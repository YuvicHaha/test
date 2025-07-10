const express = require("express");
const app = express();
app.use(express.json());

const sessions = {}; // key: { action: null, player: "Username", message: null }

app.post("/connect", (req, res) => {
  const { key, player } = req.body;
  sessions[key] = { action: null, player, message: null };
  console.log(`[CONNECT] ${player} joined with key ${key}`);
  res.send("Connected");
});

app.post("/command", (req, res) => {
  const { key, action, message } = req.body;

  if (key === "all") {
    let sent = 0;
    for (const k in sessions) {
      sessions[k].action = action;
      sessions[k].message = message || null;
      sent++;
    }
    console.log(`[COMMAND] "${action}" sent to ALL (${sent} clients)`);
    return res.send(`Command sent to ${sent} clients`);
  }

  if (sessions[key]) {
    sessions[key].action = action;
    sessions[key].message = message || null;
    console.log(`[COMMAND] "${action}" sent to ${key}`);
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

// ✅ UptimeRobot ping route
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
