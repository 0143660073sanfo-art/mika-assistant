const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/profile.json");

const defaultProfile = {
  name: "",
  project: "",
  objectif: "",
  skills: "",
  studies: "",
  preferences: ""
};

function loadProfile() {
  if (!fs.existsSync(filePath)) {
    saveProfile(defaultProfile);
  }

  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}

function saveProfile(profile) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(profile, null, 2)
  );
}

function setProfile(key, value) {
  const profile = loadProfile();

  profile[key] = value;

  saveProfile(profile);
}

function getProfile(key) {
  const profile = loadProfile();

  return profile[key];
}

module.exports = {
  setProfile,
  getProfile
};