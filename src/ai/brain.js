console.log("🔥 BRAIN CHARGÉ");

const { saveMemory } = require("../memory/memory");
const { setProfile, getProfile } = require("../memory/profile");
const { extractMemory } = require("./memoryExtractor");
function think(message, userId = "default") {
const text = message.toLowerCase();
console.log("MESSAGE REÇU :", message);
console.log("TEXTE ANALYSÉ :", text);
console.log("VERSION BRAIN OBJECTIF ACTIVE");
const memoryResult = extractMemory(message);
console.log("MEMOIRE DETECTEE :", memoryResult);
  // Retenir le nom
if ((text.includes("m'appelle") || text.includes("mappelle")) && !text.includes("comment")) {

    const name = message.split(/m'appelle|mappelle/i)[1].trim();

    saveMemory(userId, "name", name);
    setProfile("name", name);

    return `Enchanté ${name} 😊 Je vais retenir ton nom.`;
}

  // Demander le nom et surnoms
if (
  text.includes("comment je m'appelle") ||
  text.includes("quel est mon nom") ||
  text.includes("qui suis-je") ||
  (text.includes("comment") && text.includes("appelle"))
) {

  console.log("BLOC IDENTITE ACTIVE");
  const name = getProfile("name");

console.log("NAME TROUVÉ :", name);

if (name) {
  return `Tu t'appelles ${name} 😊`;
}
  return "Je ne connais pas encore ton nom.";
}
// Retenir un projet
if (text.includes("mon projet est")) {

    console.log("TEST PROJET DETECTE");

    const project = message.split(/mon projet est/i)[1].trim();

    setProfile("project", project);

    return `D'accord 😊 Je retiens que ton projet est ${project}.`;
}
// Retenir un objectif
if (text.includes("mon objectif est")) {

    console.log("TEST OBJECTIF DETECTE");

    const objectif = message.split(/mon objectif est/i)[1].trim();

    setProfile("objectif", objectif);

    return `D'accord 😊 Je retiens que ton objectif est ${objectif}.`;
}


// Question sur l'objectif
if (text.includes("quel est mon objectif") || text.includes("c'est quoi mon objectif")) {

    const objectif = getProfile("objectif");

    if (objectif) {
      return `Ton objectif est ${objectif} 🤖`;
    }

    return "Je ne connais pas encore ton objectif.";
}
  // Question sur le projet
if (text.includes("quel est mon projet")) {
  const project = getProfile("project");

  if (project) {
    return `Ton projet est ${project} 🤖`;
  }

  return "Je ne connais pas encore ton projet.";
}

// ==========================
// Question sur les études
// ==========================
if (
  text.includes("qu'est-ce que j'étudie") ||
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

// ==========================
// Question sur les compétences
// ==========================
if (
  text.includes("quelles sont mes compétences") ||
  text.includes("mes compétences")
) {
  const skills = getProfile("skills");

  if (skills) {
    return `Tes compétences sont : ${skills} 💻`;
  }

  return "Je ne connais pas encore tes compétences.";
}

// ==========================
// Question sur les préférences
// ==========================
if (
  text.includes("qu'est-ce que j'aime") ||
  text.includes("ce que j'aime") ||
  text.includes("mes préférences")
) {
  const preferences = getProfile("preferences");

  if (preferences) {
    return `Tu aimes ${preferences} ❤️`;
  }

  return "Je ne connais pas encore tes préférences.";
}

// ==========================
// Résumé du profil
// ==========================
if (
  text.includes("que sais-tu sur moi") ||
  text.includes("résume mon profil") ||
  text.includes("mon profil")
) {

  const name = getProfile("name");
  const project = getProfile("project");
  const objectif = getProfile("objectif");
  const studies = getProfile("studies");
  const skills = getProfile("skills");
  const preferences = getProfile("preferences");

  return `👤 Nom : ${name || "Inconnu"}
🚀 Projet : ${project || "Inconnu"}
🎯 Objectif : ${objectif || "Inconnu"}
📚 Études : ${studies || "Inconnues"}
💻 Compétences : ${skills || "Inconnues"}
❤️ Préférences : ${preferences || "Inconnues"}`;
}

// Bonjour
if (text.includes("bonjour") || text.includes("salut")) {
  return "Bonjour 👋 Je suis Mika Assistant 🤖";
}

  return "Je suis encore en apprentissage, mais je progresse 🧠";
}

module.exports = { think };