const { setProfile, getProfile } = require("../memory/profile");

function addUniqueToArray(key, value) {
  const current = getProfile(key);

  let list = Array.isArray(current) ? current : [];

  if (!list.some(item => item.toLowerCase() === value.toLowerCase())) {
    list.push(value);
    setProfile(key, list);
    return true;
  }

  return false;
}

function extractMemory(message) {

  console.log("=== MEMORY EXTRACTOR ACTIF ===");
  console.log("EXTRACTEUR RECU :", message);

  const text = message.trim();
  const lower = text.toLowerCase();

  // ==========================================
  // NOM
  // ==========================================

  const nameMatch = text.match(
    /(?:je\s+m['’]appelle|mon\s+nom\s+(?:est|c['’]est)|appelle[-\s]?moi|tu\s+peux\s+m['’]appeler)\s+(.+)/i
  );

  if (nameMatch) {

    const name = nameMatch[1].trim();

    if (name) {

      setProfile("name", name);

      addUniqueToArray("names", name);

      console.log("NOM ENREGISTRE :", name);

      return "name";
    }
  }

  // ==========================================
  // PROJET
  // ==========================================

  const projectMatch = text.match(
    /mon\s+projet\s+(?:est|c['’]est)\s+(.+)/i
  );

  if (projectMatch) {

    const project = projectMatch[1].trim();

    if (project) {

      setProfile("project", project);

      console.log("PROJET ENREGISTRE :", project);

      return "project";
    }
  }

  // ==========================================
  // OBJECTIF
  // ==========================================

  const objectifMatch = text.match(
    /mon\s+objectif\s+(?:est|c['’]est)\s+(.+)/i
  );

  if (objectifMatch) {

    const objectif = objectifMatch[1].trim();

    if (objectif) {

      setProfile("objectif", objectif);

      console.log("OBJECTIF ENREGISTRE :", objectif);

      return "objectif";
    }
  }

  // ==========================================
  // ETUDES
  // ==========================================

  const studyMatch = text.match(
    /(?:j['’]étudie|j['’]etudie)\s+(?:en\s+)?(.+)/i
  );

  if (studyMatch) {

    const studies = studyMatch[1].trim();

    if (studies) {

      setProfile("studies", studies);

      console.log("ETUDES ENREGISTREES :", studies);

      return "studies";
    }
  }

  const studyMatch2 = text.match(
    /je\s+fais\s+des\s+(?:études|etudes)\s+(?:en\s+)?(.+)/i
  );

  if (studyMatch2) {

    const studies = studyMatch2[1].trim();

    if (studies) {

      setProfile("studies", studies);

      console.log("ETUDES ENREGISTREES :", studies);

      return "studies";
    }
  }

  // ==========================================
  // COMPETENCES
  // ==========================================

  const skillsMatch = text.match(
    /(?:mes\s+compétences|mes\s+competences)\s+(?:sont|:)\s*(.+)/i
  );

  if (skillsMatch) {

    const skills = skillsMatch[1].trim();

    if (skills) {

      setProfile("skills", skills);

      console.log("COMPETENCES ENREGISTREES :", skills);

      return "skills";
    }
  }

  const knowMatch = text.match(
    /je\s+(?:sais|maîtrise|maitrise)\s+(.+)/i
  );

  if (knowMatch) {

    const skills = knowMatch[1].trim();

    if (skills) {

      setProfile("skills", skills);

      console.log("COMPETENCES ENREGISTREES :", skills);

      return "skills";
    }
  }

  // ==========================================
  // PREFERENCES
  // ==========================================

  const preferenceMatch = text.match(
    /j['’]aime\s+(?:bien\s+)?(.+)/i
  );

  if (preferenceMatch) {

    const preference = preferenceMatch[1].trim();

    if (preference) {

      const added = addUniqueToArray(
        "preferences",
        preference
      );

      console.log(
        added
          ? "PREFERENCE AJOUTEE :"
          : "PREFERENCE DEJA CONNUE :",
        preference
      );

      return "preferences";
    }
  }

  return null;
}

module.exports = {
  extractMemory
};