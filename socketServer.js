let users = [];

// const EditData = (data, id, call) => {
//   const newData = data.map((item) =>
//     item.id === id ? { ...item, call } : item
//   );
//   return newData;
// };

const SocketServer = (socket) => {
  socket.on("joinUser", (user) => {
    console.log("user", user);
    users.filter((e, i) => e.id != user._id);
    users.push({
      id: user._id,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    users.find((user) => user.socketId === socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
  });

  socket.on("turnLedAction", (newLedStatus) => {
    users.forEach((user) => {
      socket.to(`${user.socketId}`).emit("turnLedActionToClient", newLedStatus);
    });
  });
};

module.exports = SocketServer;
