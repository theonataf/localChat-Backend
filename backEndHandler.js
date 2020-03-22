const cors = require("cors");
const app = require("express")();

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const getAllMessages = require("./handleDb").getAllMessages;
const writeNewMessageTodb = require("./handleDb").writeNewMessageTodb;

app.use(cors());

app.get("/", (req, res) => {
  res.end("bonjour");
});
app.get("/getMessages", (req, res) => {
  const messages = getAllMessages();
  console.log(messages);
  res.json(messages);
});

// Quand un client se connecte, on le note dans la console
io.sockets.on("connection", socket => {
  socket.on("newUser", user => {
    socket.user = user;
    console.log(socket.user);
  });

  socket.on("sendNewMessage", message => {
    message.date = new Date().toLocaleDateString();
    message.id = Date.now();
    message.user = socket.user;
    const messages = writeNewMessageTodb(message);
    socket.broadcast.emit("newMessage", messages);
  });
});

server.listen(8080);
