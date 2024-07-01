const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("客户端已连接");

  socket.on("message", (message) => {
    console.log(`收到消息: ${message}`);
    socket.send(`服务器: 已收到消息 "${message}"`);
  });

  socket.on("close", () => {
    console.log("客户端已断开连接");
  });

  socket.on("error", (error) => {
    console.error("WebSocket错误", error);
  });
});

console.log("WebSocket服务器运行在 ws://localhost:8080");
