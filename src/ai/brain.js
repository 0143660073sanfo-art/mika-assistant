console.log("🔥 BRAIN CHARGE");

const { saveMemory } = require("../memory/memory");
const { getProfile } = require("../memory/profile");
const { extractMemory } = require("./memoryExtractor");

function think(message, userId = "default") {

  if (!message || typeof message !== "string") {
    return "Je n'ai pas compris ton message.";
  }

  const text = message.toLowerCase().trim();

  console.log("=================================");
  console.log("🧠 BRAIN - NOUVEAU MESSAGE");
  console.log("MESSAGE :", message);
  console.log("UTILISATEUR :", userId);
  console.log("=================================");

  // =========================================
  // 1. EXTRACTION DE LA MÉMOIRE
  // =========================================

  const memoryResult = extractMemory(message);

  console.log("🧠 MÉMOIRE DÉTECTÉE :", memoryResult);

  // =========================================
  // 2. RETENIR LE NOM
  // =========================================

  if (
    (text.includes("m'appelle") || text.includes("mappelle")) &&
    !text.includes("comment")
  ) {

    const match = message.match(/m['’]?appelle\s+(.+)/i);

    if (match) {

      const name = match[1].trim();

      saveMemory(userId, "name", name);

      return `Enchanté ${name} 😊 Je vais retenir ton nom.`;
    }
  }

  // =========================================
  // 3. DEMANDER LE NOM
  // =========================================

  if (
    text.includes("comment je m'appelle") ||
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
  // 4. DEMANDER LE PROJET
  // =========================================

  if (
    text.includes("quel est mon projet") ||
    text.includes("c'est quoi mon projet")
  ) {

    const project = getProfile("project");

    if (project) {
      return `Ton projet est ${project} 🚀`;
    }

    return "Je ne connais pas encore ton projet.";
  }

  // =========================================
  // 5. DEMANDER L'OBJECTIF
  // =========================================

  if (
    text.includes("quel est mon objectif") ||
    text.includes("c'est quoi mon objectif")
  ) {

    const objectif = getProfile("objectif");

    if (objectif) {
      return `Ton objectif est ${objectif} 🎯`;
    }

    return "Je ne connais pas encore ton objectif.";
  }

  // =========================================
  // 6. DEMANDER LES ÉTUDES
  // =========================================

  if (
    text.includes("qu'est-ce que j'étudie") ||
    text.includes("qu'est ce que j'étudie") ||
    text.includes("quelles sont mes études") ||
    text.includes("j'étudie quoi") ||
    text.includes("que j'étudie") ||
    text.includes("mes études")
  ) {

    const studies = getProfile("studies");

    if (studies) {
      return `Tu étudies ${studies} 📚`;
    }

    return "Je ne connais pas encore tes études.";
  }

  // =========================================
  // 7. DEMANDER LES COMPÉTENCES
  // =========================================

  if (
    text.includes("quelles sont mes compétences") ||
    text.includes("quelles sont mes competences") ||
    text.includes("mes compétences") ||
    text.includes("mes competences")
  ) {

    const skills = getProfile("skills");

    if (skills) {
      return `Tes compétences sont : ${skills} 💻`;
    }

    return "Je ne connais pas encore tes compétences.";
  }

  // =========================================
  // 8. DEMANDER LES PRÉFÉRENCES
  // =========================================

  if (
    text.includes("qu'est-ce que j'aime") ||
    text.includes("qu'est ce que j'aime") ||
    text.includes("ce que j'aime") ||
    text.includes("mes préférences") ||
    text.includes("mes preferences")
  ) {

    const preferences = getProfile("preferences");

    if (preferences) {

      if (Array.isArray(preferences)) {
        return `Tu aimes ${preferences.join(", ")} ❤️`;
      }

      return `Tu aimes ${preferences} ❤️`;
    }

    return "Je ne connais pas encore tes préférences.";
  }

  // =========================================
  // 9. RÉSUMÉ DU PROFIL
  // =========================================

  if (
    text.includes("que sais-tu sur moi") ||
    text.includes("que sais tu sur moi") ||
    text.includes("résume mon profil") ||
    text.includes("resume mon profil") ||
    text === "mon profil"
  ) {

    const name = getProfile("name");
    const project = getProfile("project");
    const objectif = getProfile("objectif");
    const studies = getProfile("studies");
    const skills = getProfile("skills");
    const preferences = getProfile("preferences");

    const preferencesText = Array.isArray(preferences)
      ? preferences.join(", ")
      : preferences;

    return `👤 Nom : ${name || "Inconnu"}
🚀 Projet : ${project || "Inconnu"}
🎯 Objectif : ${objectif || "Inconnu"}
📚 Études : ${studies || "Inconnues"}
💻 Compétences : ${skills || "Inconnues"}
❤️ Préférences : ${preferencesText || "Inconnues"}`;
  }

  // =========================================
  // 10. SALUTATIONS
  // =========================================

  if (
    text === "bonjour" ||
    text === "salut" ||
    text === "hello" ||
    text === "bonsoir"
  ) {

    const name = getProfile("name");

    if (name) {
      return `Bonjour ${name} 👋 Je suis Mika Assistant 🤖`;
    }

    return "Bonjour 👋 Je suis Mika Assistant 🤖";
  }

  // =========================================
  // 11. RÉPONSE PAR DÉFAUT
  // =========================================

  return "Je suis encore en apprentissage, mais je progresse 🧠🚀";
}

module.exports = {
  think
};