const express = require("express");
const router = express.Router();

const { think } = require("../src/ai/brain");
const { sendWhatsAppMessage } = require("../sendMessage");

// Vérification Meta du webhook
router.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK WHATSAPP VALIDÉ ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }

});


// Réception des messages WhatsApp
router.post("/webhook", async (req, res) => {

  try {

    console.log("WHATSAPP REÇU :", JSON.stringify(req.body, null, 2));

    const message =
      req.body.entry?.[0]
      ?.changes?.[0]
      ?.value?.messages?.[0];

    if (message) {

      const numero = message.from;
      const texte = message.text.body;

      console.log("MESSAGE UTILISATEUR :", texte);

      const reponse = think(texte, numero);

      await sendWhatsAppMessage(numero, reponse);

    }

    res.sendStatus(200);

  } catch (error) {

    console.log("ERREUR WEBHOOK :", error.message);

    res.sendStatus(500);

  }

});


module.exports = router;