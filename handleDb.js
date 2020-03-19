const fs = require("fs");

const HandleDB = {
  messages: [],
  users: [],
  getFileState: () => {
    return JSON.parse(fs.readFileSync("./messagesdb.json"));
  },
  getAllMessages: self => {
    const json = JSON.parse(fs.readFileSync("./messagesdb.json"));
    self.messages = json.messages;
  },
  writeNewMessageTodb: (self, message) => {
    self.messages.push(message);
    const f = self.getFileState();
    f.messages = self.messages;
    fs.writeFileSync("./messagesdb.json", JSON.stringify(f));
  }
};

exports.dbHandler = HandleDB;
