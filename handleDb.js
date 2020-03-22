const fs = require("fs");

function getFileState() {
  return JSON.parse(fs.readFileSync("./messagesdb.json"));
}

function getAllMessages() {
  const json = JSON.parse(fs.readFileSync("./messagesdb.json"));
  return json.messages;
}

function writeNewMessageTodb(message) {
  const f = getFileState();
  f.messages.push(message);
  fs.writeFileSync("./messagesdb.json", JSON.stringify(f));
  return f.messages;
}

exports.getAllMessages = getAllMessages;
exports.writeNewMessageTodb = writeNewMessageTodb;
