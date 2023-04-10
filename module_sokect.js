const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket}`);

  socket.on("event", (data) => {
    console.log("event", data);
    // socket.join(data);
  });

  socket.on("fromServer", (data) => {
    console.log("fromServer");
    // socket.to(data.room).emit("receive_message", data);
  });

  socket.on("focus", (data) => {
    console.log("focus");
    io.emit("focus", data);
  });

  socket.on("sendChat", (data) => {
    console.log("sendChat", data);
    const message = JSON.parse(data);
    const jsonObject = {
      user: message.user ?? "",
      message: message.message,
    };

    io.emit("sendChat", jsonObject);
  });
});

module.exports = io;
