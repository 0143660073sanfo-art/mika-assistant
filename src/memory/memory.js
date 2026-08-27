const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "memories.json");

let memories = {};

// Charger la mémoire existante
if (fs.existsSync(filePath)) {
  memories = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveMemory(userId, key, value) {

  if (!memories[userId]) {
    memories[userId] = {};
  }

  memories[userId][key] = value;

  fs.writeFileSync(
    filePath,
    JSON.stringify(memories, null, 2)
  );
}


function getMemory(userId, key) {

  if (!memories[userId]) {
    return null;
  }

  return memories[userId][key] || null;
}


module.exports = {
  saveMemory,
  getMemory
};