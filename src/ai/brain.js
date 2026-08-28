console.log("🔥 BRAIN CHARGE");

const { saveMemory } = require("../memory/memory");
const { getProfile } = require("../memory/profile");
const { extractMemory } = require("./memoryExtractor");
const { addMessage, getHistory } = require("../memory/history");
function think(message, userId = "default") {

  if (!message || typeof message !== "string") {
    return "Je n'ai pas compris ton message.";
  }

  const text = message.toLowerCase().trim();

  addMessage(userId, "user", message);
  console.log("=================================");
  console.log("🧠 BRAIN - NOUVEAU MESSAGE");
  console.log("MESSAGE :", message);
  console.log("UTILISATEUR :", userId);
  console.log("=================================");

  // =========================================
  // 1. EXTRACTION AUTOMATIQUE DE LA MEMOIRE
  // =========================================

  const memoryResult = extractMemory(message);

  console.log("🧠 MÉMOIRE DÉTECTÉE :", memoryResult);


  // =========================================
  // 2. IDENTITE
  // =========================================

  if (
    text.includes("comment je m'appelle") ||
    text.includes("comment je mappelle") ||
    text.includes("quel est mon nom") ||
    text.includes("qui suis-je")
  ) {

    const name = getProfile("name");

    if (name) {
      return `Tu t'appelles ${name} 😊`;
    }

    return "Je ne connais pas encore ton nom.";
  }


  // =========================================
  // 3. SURNOMS
  // =========================================

  if (
    text.includes("quel est mon surnom") ||
    text.includes("quels sont mes surnoms") ||
    text.includes("mes surnoms")
  ) {

    const names = getProfile("names");

    if (Array.isArray(names) && names.length > 0) {

      return `Tes surnoms sont : ${names.join(", ")} 😎`;
    }

    return "Je ne connais pas encore tes surnoms.";
  }


  // =========================================
  // 4. PROJET
  // =========================================

  if (
    text.includes("quel est mon projet") ||
    text.includes("c'est quoi mon projet") ||
    text.includes("quel est le nom de mon projet")
  ) {

    const project = getProfile("project");

    if (project) {
      return `Ton projet est ${project} 🚀`;
    }

    return "Je ne connais pas encore ton projet.";
  }


  // =========================================
  // 5. OBJECTIF
  // =========================================

  if (
    text.includes("quel est mon objectif") ||
    text.includes("c'est quoi mon objectif") ||
    text.includes("quel est mon but")
  ) {

    const objectif = getProfile("objectif");

    if (objectif) {
      return `Ton objectif est ${objectif} 🎯`;
    }

    return "Je ne connais pas encore ton objectif.";
  }


  // =========================================
  // 6. ETUDES
  // =========================================

  if (
    text.includes("qu'est-ce que j'étudie") ||
    text.includes("qu'est ce que j'étudie") ||
    text.includes("quelles sont mes études") ||
    text.includes("j'étudie quoi") ||
    text.includes("que j'étudie") ||
    text.includes("mes études") ||
    text.includes("mes etudes")
  ) {

    const studies = getProfile("studies");

    if (studies) {
      return `Tu étudies ${studies} 📚`;
    }

    return "Je ne connais pas encore tes études.";
  }


  // =========================================
  // 7. COMPETENCES
  // =========================================

  if (
    text.includes("quelles sont mes compétences") ||
    text.includes("quelles sont mes competences") ||
    text.includes("mes compétences") ||
    text.includes("mes competences") ||
    text.includes("mes compétences informatiques")
  ) {

    const skills = getProfile("skills");

    if (skills) {
      return `Tes compétences sont : ${skills} 💻`;
    }

    return "Je ne connais pas encore tes compétences.";
  }


  // =========================================
  // 8. PREFERENCES
  // =========================================

  if (
    text.includes("qu'est-ce que j'aime") ||
    text.includes("qu'est ce que j'aime") ||
    text.includes("ce que j'aime") ||
    text.includes("mes préférences") ||
    text.includes("mes preferences") ||
    text.includes("ce que j'aime bien")
  ) {

    const preferences = getProfile("preferences");

    if (Array.isArray(preferences) && preferences.length > 0) {

      return `Tu aimes : ${preferences.join(", ")} ❤️`;
    }

    if (preferences) {
      return `Tu aimes : ${preferences} ❤️`;
    }

    return "Je ne connais pas encore tes préférences.";
  }


  // =========================================
  // 9. PROFIL COMPLET
  // =========================================

  if (
    text.includes("que sais-tu sur moi") ||
    text.includes("que sais tu sur moi") ||
    text.includes("qu'est-ce que tu sais sur moi") ||
    text.includes("qu'est ce que tu sais sur moi") ||
    text.includes("résume mon profil") ||
    text.includes("resume mon profil") ||
    text === "mon profil"
  ) {

    const name = getProfile("name");
    const names = getProfile("names");
    const project = getProfile("project");
    const objectif = getProfile("objectif");
    const studies = getProfile("studies");
    const skills = getProfile("skills");
    const preferences = getProfile("preferences");

    const namesText =
      Array.isArray(names) && names.length > 0
        ? names.join(", ")
        : "Aucun";

    const preferencesText =
      Array.isArray(preferences) && preferences.length > 0
        ? preferences.join(", ")
        : preferences || "Aucune";

    return `👤 Nom : ${name || "Inconnu"}
🏷️ Surnoms : ${namesText}
🚀 Projet : ${project || "Inconnu"}
🎯 Objectif : ${objectif || "Inconnu"}
📚 Études : ${studies || "Inconnues"}
💻 Compétences : ${skills || "Inconnues"}
❤️ Préférences : ${preferencesText}`;
  }


  // =========================================
  // 10. SALUTATIONS
  // =========================================

  if (
    text === "bonjour" ||
    text === "salut" ||
    text === "hello" ||
    text === "bonsoir" ||
    text === "coucou"
  ) {

    const name = getProfile("name");

    if (name) {
      return `Bonjour ${name} 👋 Je suis Mika Assistant 🤖`;
    }

    return "Bonjour 👋 Je suis Mika Assistant 🤖";
  }


  // =========================================
  // 11. REPONSE PAR DEFAUT
  // =========================================

  return "Je suis encore en apprentissage, mais je progresse 🧠🚀";
}


module.exports = {
  think
};