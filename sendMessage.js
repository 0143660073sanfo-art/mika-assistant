console.log("PHONE_NUMBER_ID :", process.env.PHONE_NUMBER_ID);
console.log("TOKEN présent :", !!process.env.WHATSAPP_TOKEN);
const axios = require("axios");

async function sendWhatsAppMessage(to, message) {

  const url = `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`;

  try {
    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("MESSAGE WHATSAPP ENVOYÉ ✅");

  } catch (error) {
    console.log(
      "ERREUR WHATSAPP :",
      error.response?.data || error.message
    );
  }
}

module.exports = {
  sendWhatsAppMessage
};