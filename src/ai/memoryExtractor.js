const { setProfile } = require("../memory/profile");

function extractMemory(message) {

  console.log("=== MEMORY EXTRACTOR ACTIF ===");
  console.log("EXTRACTEUR REÇU :", message);

  const text = message.toLowerCase();
  // Nom et surnoms
if (text.includes("m'appelle") || text.includes("mappelle")) {

  setProfile("names", [
    "Le briseur",
    "Le charmeur",
    "Le chouchou des Nanas",
    "Mika"
  ]);

  console.log("NOMS ENREGISTRES :", [
    "Le briseur",
    "Le charmeur",
    "Le chouchou des Nanas",
    "Mika"
  ]);

  return "names";
}

  // Projet
  if (text.includes("mon projet")) {
    const project = message.split(/mon projet/i)[1].trim();

    setProfile("project", project);

    return "project";
  }

// Objectif
if (text.includes("objectif")) {

  const objectif = message
    .replace(/mon objectif est/i, "")
    .trim();

  if (objectif) {
    setProfile("objectif", objectif);

    console.log("OBJECTIF ENREGISTRE :", objectif);

    return "objectif";
  }
}  
// Études
if (
  text.includes("j'étudie") ||
  text.includes("j'etudie") ||
  text.includes("je fais des études") ||
  text.includes("je fais des etudes")
) {
  const study = message
    .replace(/j'étudie en|j'étudie|j'etudie en|j'etudie|je fais des études|je fais des etudes/i, "")
    .trim();

  if (study) {
    setProfile("studies", study);

    console.log("ETUDES ENREGISTREES :", study);

    return "studies";
  }
}


// Compétences
if (
  text.includes("mes compétences") ||
  text.includes("mes competences") ||
  text.includes("mes comp") ||
  text.includes("je sais") ||
  text.includes("je maîtrise") ||
  text.includes("je maitrise")
) {
  const skills = message
.replace(/mes compétences sont|mes competences sont|mes comp.tences sont|je sais|je maîtrise|je maitrise/i, "")
    .trim();

  if (skills) {
    setProfile("skills", skills);

    console.log("COMPETENCES ENREGISTREES :", skills);

    return "skills";
  }
}


// Préférences
if (text.includes("j'aime") || text.includes("j'aime bien")) {

  const preference = message
    .replace(/j'aime bien|j'aime/i, "")
    .trim();

  if (preference) {
    setProfile("preferences", preference);

    console.log("PREFERENCE ENREGISTREE :", preference);

    return "preferences";
  }
}
  return null;
}


module.exports = {
  extractMemory
};