const websocketUrl = "ws://localhost:8080"; // 替换为实际WebSocket URL
let socket;

// 初始化WebSocket
function initializeWebSocket() {
  socket = new WebSocket(websocketUrl);

  socket.onopen = function () {
    console.log("WebSocket连接已打开");
    displayMessage("系统", "WebSocket连接已打开");
  };

  socket.onmessage = function (event) {
    const message = event.data;
    displayMessage("机器人", message);
  };

  socket.onclose = function () {
    console.log("WebSocket连接已关闭");
    displayMessage("系统", "WebSocket连接已关闭");
  };

  socket.onerror = function (error) {
    console.error("WebSocket错误", error);
    displayMessage("系统", "WebSocket发生错误");
  };
}

// 发送消息
function sendMessage(event) {
  event.preventDefault();
  const messageText = document.getElementById("messageText").value;
  if (messageText && socket.readyState === WebSocket.OPEN) {
    socket.send(messageText);
    displayMessage("用户", messageText);
    document.getElementById("messageText").value = "";
  }
}

// 初始化聊天
function initChat() {
  const chatContainer = document.querySelector(".chat_chat-body__QFv5x");
  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }

  const welcomeMessage = "欢迎来到湘潭大学智能教辅平台，您有什么需要呢？";
  displayMessage("机器人", welcomeMessage);
}

// 显示消息
function displayMessage(sender, message) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "chat_chat-message__dg8rL";
  messageContainer.style.display = "flex";
  messageContainer.style.flexDirection =
    sender === "用户" ? "row-reverse" : "row";
  messageContainer.style.alignItems = "flex-end";

  const messageWrapper = document.createElement("div");
  messageWrapper.className = "chat_chat-message-container__O_X8_";
  messageWrapper.style.position = "relative";
  messageWrapper.style.maxWidth = "60%";

  const messageAvatar = document.createElement("div");
  messageAvatar.className = "chat_chat-message-avatar__3QeMq";

  const avatarImg = document.createElement("img");
  avatarImg.src = sender === "用户" ? "../img/User.png" : "../img/AIBot.png";
  avatarImg.width = 30;
  avatarImg.height = 30;
  messageAvatar.appendChild(avatarImg);

  const messageItem = document.createElement("div");
  messageItem.className = "chat_chat-message-item__dKqMl";
  messageItem.style.textAlign = sender === "用户" ? "right" : "left";

  const messageBody = document.createElement("div");
  messageBody.className = "markdown-body";
  messageBody.style.fontSize = "14px";

  const messageText = document.createElement("p");
  messageText.className = sender === "用户" ? "message_user" : "message_robot";
  messageText.innerText = message;

  messageBody.appendChild(messageText);
  messageItem.appendChild(messageBody);

  const messageActions = document.createElement("div");
  messageActions.className = "chat_chat-message-actions__H90hg";
  messageActions.style.textAlign = sender === "用户" ? "right" : "left";

  const copyAction = document.createElement("div");
  copyAction.className = "chat_chat-input-actions__mwYC_";
  copyAction.innerHTML = `
    <div
      class="chat_chat-input-action__DMW7Y clickable ${
        sender === "用户" ? "user" : "else"
      }"
      style="--icon-width: 16px; --full-width: 16px"
      onclick="message_copy(event)"
    >
      <div class="chat_icon__Ly3TN">
        <i class="fas fa-copy copy_svg__icon"></i>
        <div class="chat_text__TkPfN">复制</div>
      </div>
    </div>
  `;

  const messageDate = document.createElement("div");
  messageDate.className = "chat_chat-message-action-date__RsXTn";
  const now = new Date();
  messageDate.innerText = now.toLocaleTimeString();
  messageDate.style.position = "absolute";
  messageDate.style.bottom = "-1.5em";
  messageDate.style.left = sender === "用户" ? "auto" : "0";
  messageDate.style.right = sender === "用户" ? "0" : "auto";

  messageActions.appendChild(copyAction);
  messageWrapper.appendChild(messageAvatar);
  messageWrapper.appendChild(messageItem);
  messageWrapper.appendChild(messageActions);
  messageWrapper.appendChild(messageDate);
  messageContainer.appendChild(messageWrapper);

  document
    .querySelector(".chat_chat-body__QFv5x")
    .appendChild(messageContainer);
}

// 处理文件上传
function handleFiles(files) {
  const file = files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      socket.send(fileContent);
      displayMessage("用户", `已上传文件: ${file.name}`);
    };
    reader.readAsText(file);
  }
}

function upload() {
  document.getElementById("fileInput").click();
}

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  initializeWebSocket();
  initChat();

  document.querySelector("form").addEventListener("submit", sendMessage);
  document.getElementById("fileInput").addEventListener("change", function () {
    handleFiles(this.files);
  });
});

function message_copy(event) {
  const messageElement = event.currentTarget
    .closest(".chat_chat-message-item__dKqMl")
    .querySelector("p");
  navigator.clipboard.writeText(messageElement.innerText).then(function () {
    alert("消息已复制到剪贴板");
  });
}
