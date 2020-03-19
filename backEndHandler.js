const http = require("http");
// const app = require("express");
const dbHandler = require("./handleDb").dbHandler;

// Chargement du fichier index.html affiché au client
var server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "json" });
  //   fs.readFile("./index.html", "utf-8", (error, content) => {
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.end(content);
  //   });
});

// Chargement de socket.io
var io = require("socket.io").listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on("connection", socket => {
  dbHandler.getAllMessages(dbHandler);

  socket.on("newUser", user => {
    socket.user = user;
    console.log(socket.user);
  });
  console.log(socket.user);
  socket.emit("User", socket.user === null ? false : socket.user);

  socket.on("sendNewMessage", message => {
    message.date = new Date().toLocaleDateString();
    message.id = Date.now();
    message.username = socket.user.username;
    dbHandler.writeNewMessageTodb(dbHandler, message);
    socket.emit("refreshMessage", dbHandler.messages);
  });
});

server.listen(8080);
