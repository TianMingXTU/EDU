// websocket.js
var ws = null;

// 连接WebSocket服务器
function connect(
  nickname,
  handleOpen,
  handleClose,
  handleError,
  handleMessage
) {
  if (nickname.trim() === "") {
    alert("请输入昵称");
    return;
  }

  ws = new WebSocket(`ws://localhost:8080/ws/${nickname}`);

  ws.onopen = handleOpen;
  ws.onclose = handleClose;
  ws.onerror = handleError;
  ws.onmessage = handleMessage;
}

// 断开WebSocket连接
function disconnect() {
  if (ws) {
    ws.close();
    console.log("WebSocket连接关闭");
  }
}

// 发送消息
function sendMessage(message) {
  if (ws) {
    ws.send(message);
  } else {
    console.error("WebSocket未连接");
  }
}

export { connect, disconnect, sendMessage };
