import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "25mb" }));

let messages = [];

// Send encrypted message
app.post("/send", (req, res) => {
  const { from, to, ciphertext, type } = req.body;

  messages.push({
    from,
    to,
    ciphertext,
    type,
    time: Date.now(),
  });

  res.json({ status: "ok" });
});

// Get messages for user
app.get("/messages/:user", (req, res) => {
  const u = req.params.user;
  const userMsgs = messages.filter((m) => m.to === u);
  res.json(userMsgs);
});

app.get("/", (req, res) => {
  res.send("Secure Chat Server Running");
});

app.listen(3000, () =>
  console.log("Server live on port 3000")
);
