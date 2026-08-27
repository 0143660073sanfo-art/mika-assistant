const express = require("express");
const { think } = require("../src/ai/brain");
const { addMessage, getHistory } = require("../src/memory/history");

console.log("🔥 ROUTES API CHARGÉES");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    assistant: "Mika Assistant",
    status: "en ligne 🤖"
  });
});

router.post("/chat", (req, res) => {
  const message = req.body.message;
  console.log("API REÇU :", message);

  const userId = "default";

  // Enregistrer le message utilisateur
  addMessage(userId, "user", message);

  // Générer la réponse de Mika
  const response = think(message, userId);

  console.log("RÉPONSE DE MIKA :", response);

  // Enregistrer la réponse de Mika
  addMessage(userId, "assistant", response);

  res.json({
    message,
    response
  });
});

// Voir l'historique
router.get("/history", (req, res) => {
  const userId = "default";

  res.json(getHistory(userId));
});

module.exports = router;