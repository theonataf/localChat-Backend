var http = require("http");

// Chargement du fichier index.html affiché au client
var server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (error, content) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

// Chargement de socket.io
var io = require("socket.io").listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on("connection", socket => {
  socket.emit("newConnection", {
    content: "Vous êtes bien connecté !",
    importance: "1"
  });

  socket.on("petit_nouveau", pseudo => {
    socket.pseudo = pseudo;
  });

  socket.on("message", message => {
    console.log(socket.pseudo + " me parle ! Il me dit : " + message);
  });
});

server.listen(8080);
