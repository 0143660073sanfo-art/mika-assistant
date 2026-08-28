const { setProfile } = require("../memory/profile");

function extractMemory(message) {
  console.log("=== MEMORY EXTRACTOR ACTIF ===");
  console.log("EXTRACTEUR RECU :", message);

  if (!message || typeof message !== "string") {
    return null;
  }

  const text = message.trim();

  // =========================
  // NOM
  // =========================

  const nameMatch = text.match(
    /(?:je\s+)?m['’]?appelle\s+(.+)/i
  );

  if (nameMatch) {
    const name = nameMatch[1].trim();

    if (name && !name.toLowerCase().includes("comment")) {
      setProfile("name", name);

      console.log("NOM ENREGISTRE :", name);

      return {
        type: "name",
        value: name
      };
    }
  }

  // =========================
  // PROJET
  // =========================

  const projectMatch = text.match(
    /mon\s+projet\s+(?:est|c'est)\s+(.+)/i
  );

  if (projectMatch) {
    const project = projectMatch[1].trim();

    if (project) {
      setProfile("project", project);

      console.log("PROJET ENREGISTRE :", project);

      return {
        type: "project",
        value: project
      };
    }
  }

  // =========================
  // OBJECTIF
  // =========================

  const objectiveMatch = text.match(
  /mon\s+objectif\s+(?:est|c'est)\s+(?:de\s+)?(.+)/i
);
  if (objectiveMatch) {
    const objectif = objectiveMatch[1].trim();

    if (objectif) {
      setProfile("objectif", objectif);

      console.log("OBJECTIF ENREGISTRE :", objectif);

      return {
        type: "objectif",
        value: objectif
      };
    }
  }

  // =========================
  // ETUDES
  // =========================

  const studiesMatch = text.match(
    /(?:j['’]étudie(?:\s+en)?|je\s+fais\s+des\s+études(?:\s+en)?)\s+(.+)/i
  );

  if (studiesMatch) {
    const studies = studiesMatch[1].trim();

    if (studies) {
      setProfile("studies", studies);

      console.log("ETUDES ENREGISTREES :", studies);

      return {
        type: "studies",
        value: studies
      };
    }
  }

  // =========================
  // COMPETENCES
  // =========================

  const skillsMatch = text.match(
    /(?:mes\s+compétences\s+sont|mes\s+competences\s+sont|je\s+sais|je\s+maîtrise|je\s+maitrise)\s+(.+)/i
  );

  if (skillsMatch) {
    const skills = skillsMatch[1].trim();

    if (skills) {
      setProfile("skills", skills);

      console.log("COMPETENCES ENREGISTREES :", skills);

      return {
        type: "skills",
        value: skills
      };
    }
  }

  // =========================
  // PREFERENCES
  // =========================

  const preferenceMatch = text.match(
    /j['’]aime(?:\s+bien)?\s+(.+)/i
  );

  if (preferenceMatch) {
    const preference = preferenceMatch[1].trim();

    if (preference) {
      const profile = require("../memory/profile").getFullProfile();

      const preferences = Array.isArray(profile.preferences)
        ? profile.preferences
        : [];

      if (!preferences.includes(preference)) {
        preferences.push(preference);
      }

      setProfile("preferences", preferences);

      console.log("PREFERENCE ENREGISTREE :", preference);

      return {
        type: "preference",
        value: preference
      };
    }
  }

  return null;
}

module.exports = {
  extractMemory
};