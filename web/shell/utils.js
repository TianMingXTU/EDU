// utils.js
import { connect, disconnect } from "./websocket.js";
import { handleMessage } from "./message.js";
import { restoreChatRooms } from "./chatroom.js";

var chatroom_id = "";
var user_id = "user123"; // 这里需要根据实际情况获取用户ID
var nickname = "老六";

// 初始化函数，恢复聊天室信息并连接WebSocket
function initialize() {
  restoreChatRooms(user_id, chatroom_id, nickname);
  connect(nickname, handleOpen, handleClose, handleError, (event) =>
    handleMessage(event, chatroom_id, nickname)
  );
}

// WebSocket打开事件处理
function handleOpen() {
  console.log("WebSocket连接成功");
}

// WebSocket关闭事件处理
function handleClose() {
  console.log("WebSocket连接关闭");
}

// WebSocket错误事件处理
function handleError(event) {
  console.error("WebSocket错误: ", event);
}

// 发送消息
function sendMessage(event) {
  if (chatroom_id === "") {
    alert("请选择聊天室");
    return;
  }

  var input = document.getElementById("messageText");
  if (!input) {
    console.error("消息输入框未找到");
    return;
  }
  var time = new Date().toLocaleString();
  var username = document.getElementById("username").value || "-1";

  if (chatroom_id === "private_assistant") {
    username = user_id;
  }

  var message = `${input.value}@username${username}+@time${time}+@chatroom_id${chatroom_id}`;
  sendMessage(message);
  input.value = "";
  event.preventDefault();
}

document.addEventListener("DOMContentLoaded", initialize);

export { initialize, sendMessage };
