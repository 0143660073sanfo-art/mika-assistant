const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");
const whatsappWebhook = require("./routes/whatsappWebhook");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", whatsappWebhook);
app.get("/", (req, res) => {
  res.send("Mika Assistant est en ligne 🤖");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mika Assistant lancé sur le port ${PORT}`);
});

process.stdin.resume();

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Serveur arrêté proprement");
    process.exit(0);
  });
});