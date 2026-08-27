const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/history.json");

function loadHistory() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}

function saveHistory(history) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(history, null, 2)
  );
}

function addMessage(userId, role, content) {
  const history = loadHistory();

  history.push({
    userId,
    role,
    content,
    date: new Date()
  });

  saveHistory(history);
}

function getHistory(userId) {
  const history = loadHistory();

  return history.filter(
    message => message.userId === userId
  );
}

module.exports = {
  addMessage,
  getHistory
};