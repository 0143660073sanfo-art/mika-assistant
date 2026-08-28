const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
const filePath = path.join(dataDir, "profile.json");

const defaultProfile = {
  name: "",
  names: [],
  project: "",
  objectif: "",
  skills: "",
  studies: "",
  preferences: []
};

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadProfile() {
  ensureDataDirectory();

  if (!fs.existsSync(filePath)) {
    saveProfile(defaultProfile);
    return { ...defaultProfile };
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("ERREUR LECTURE PROFIL :", error.message);
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  ensureDataDirectory();

  fs.writeFileSync(
    filePath,
    JSON.stringify(profile, null, 2),
    "utf8"
  );
}

function setProfile(key, value) {
  const profile = loadProfile();

  profile[key] = value;

  saveProfile(profile);

  console.log(`MEMOIRE PROFIL : ${key} =`, value);
}

function getProfile(key) {
  const profile = loadProfile();

  return profile[key];
}

function getFullProfile() {
  return loadProfile();
}

module.exports = {
  setProfile,
  getProfile,
  getFullProfile
};