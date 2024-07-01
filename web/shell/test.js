// WebSocket对象
var ws = null;

// 当前聊天室ID
var chatroom_id = "";

// 用户ID
var user_id = "user123"; // 这里需要根据实际情况获取用户ID

// 用户昵称
var nickname = "老六";

// 初始化函数，恢复聊天室信息并连接WebSocket
function initialize() {
  restoreChatRooms();
  connect();
}

// 连接WebSocket服务器
function connect() {
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

// WebSocket消息事件处理
function handleMessage(event) {
  var message = String(event.data);

  if (message.includes("@member_number")) {
    updateMemberCount(message);
  } else if (message.includes(`+@chatroom_id${chatroom_id}`)) {
    processChatMessage(message);
  } else if (message.includes("@温馨提示：以上为历史消息")) {
    insertHistoryMessageTip();
  } else if (message.includes("@切换")) {
    clearChatMessages();
    if (chatroom_id === "private_assistant") {
      loadPrivateChatHistory();
    } else {
      loadChatHistory(chatroom_id);
    }
  }

  scrollToBottom();
}

// 更新群成员数量
function updateMemberCount(message) {
  var memberCount = message.split("@member_number")[1];
  var memberCountElement = document.querySelector(
    `#chat_room_${chatroom_id} .home_chat-item-count____Lpy`
  );
  if (memberCountElement) {
    memberCountElement.innerText = `群成员数量：${memberCount}人`;
  } else {
    console.error("无法更新成员数量，元素未找到");
  }
}

// 处理聊天消息
function processChatMessage(message) {
  var cleanMessage = message.split("+@chatroom_id")[0];
  var isOwn = isOwnMessage(cleanMessage);

  if (isOwn) {
    insertOwnMessage(cleanMessage);
  } else {
    insertOtherMessage(cleanMessage);
  }
}

// 判断是否为自己的消息
function isOwnMessage(message) {
  return (
    message.includes("【你 ") ||
    message.includes("你:") ||
    message.includes(`${nickname}:`)
  );
}

// 插入自己的消息
function insertOwnMessage(message) {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  var newMessage = createMessageElement(
    "chat_chat-message-user__ZtTEj",
    "message_user",
    message
  );
  if (newMessage) {
    chatBody.append(newMessage);
    insertMessageTime(newMessage, message);
  }
}

// 插入他人的消息
function insertOtherMessage(message) {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  var newMessage = createMessageElement(
    "chat_chat-message__dg8rL",
    "message_roboat",
    message
  );
  if (newMessage) {
    chatBody.append(newMessage);
    insertMessageTime(newMessage, message);
  }
}

// 创建消息元素
function createMessageElement(baseClass, messageClass, message) {
  var baseElements = document.getElementsByClassName(baseClass);
  if (baseElements.length === 0) {
    console.error("消息基类元素未找到");
    return null;
  }
  var baseElement = baseElements[0].cloneNode(true);
  var messageElement = baseElement.getElementsByClassName(messageClass)[0];

  if (message.includes("@username-1")) {
    messageElement.innerHTML = message.split("@username")[0];
  } else if (message.includes("加入了群聊")) {
    messageElement.innerHTML = message.split("+@chatroom_id")[0];
  } else {
    messageElement.innerHTML = message.split("@username")[0];
  }

  return baseElement;
}

// 插入消息时间
function insertMessageTime(element, message) {
  var timeElement = element.getElementsByClassName(
    "chat_chat-message-action-date__RsXTn"
  )[0];
  if (timeElement) {
    timeElement.innerHTML = message.split("+@time")[1];
  } else {
    console.error("时间元素未找到");
  }
}

// 插入历史消息提示
function insertHistoryMessageTip() {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  var tipElement = document.createElement("p");
  tipElement.classList.add("tip");
  tipElement.innerHTML = "【温馨提示：以上为历史消息】";
  chatBody.append(tipElement);
}

// 清除聊天消息
function clearChatMessages() {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  while (chatBody.firstChild) {
    chatBody.removeChild(chatBody.firstChild);
  }
}

// 滚动到底部
function scrollToBottom() {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  if (chatBody.scrollHeight > chatBody.clientHeight) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
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
  ws.send(message);
  input.value = "";
  event.preventDefault();
}

// 断开WebSocket连接
function disconnect() {
  if (ws) {
    ws.close();
    console.log("WebSocket连接关闭");
  }
}

// 插入@bot文本
function addBotMention() {
  var messageInput = document.getElementById("messageText");
  if (!messageInput) {
    console.error("消息输入框未找到");
    return;
  }
  var startPos = messageInput.selectionStart;
  var endPos = messageInput.selectionEnd;
  messageInput.value =
    messageInput.value.substring(0, startPos) +
    "@bot" +
    messageInput.value.substring(endPos, messageInput.value.length);
  messageInput.focus();
}

// 选择聊天室
function selectRoom(event) {
  var selectedElement = event.currentTarget;
  var roomMessages = document.getElementsByClassName("home_chat-item__Oblai");

  Array.from(roomMessages).forEach((msg) => {
    msg.classList.remove("home_chat-item-selected__b6eBe");
    msg.classList.add("false");
  });

  selectedElement.classList.remove("false");
  selectedElement.classList.add("home_chat-item-selected__b6eBe");

  chatroom_id = selectedElement.getAttribute("data-room-id");
  var roomName = selectedElement
    .querySelector(".home_chat-item-title__sRstw")
    .innerText.split(" (")[0];
  var titleElement = document.querySelector(
    ".chat_chat-body-title__d2ItC .window-header-main-title"
  );
  if (titleElement) {
    titleElement.innerText = roomName;
  } else {
    console.error("聊天室标题元素未找到");
  }

  ws.send("+@切换" + chatroom_id);

  // 保存当前选择的聊天室ID
  localStorage.setItem("currentChatRoom", chatroom_id);

  if (chatroom_id === "private_assistant") {
    // 载入私人助手的历史聊天记录
    loadPrivateChatHistory();
  } else {
    // 更新聊天室成员数量
    fetch(`http://localhost:8080/get_room_members/${chatroom_id}`)
      .then((response) => response.json())
      .then((data) => {
        var memberCountElement = document.querySelector(
          `#chat_room_${chatroom_id} .home_chat-item-count____Lpy`
        );
        if (memberCountElement) {
          memberCountElement.innerText = `群成员数量：${data.member_count}人`;
        } else {
          console.error("无法更新成员数量，元素未找到");
        }
      })
      .catch((error) => console.error("获取聊天室成员数量失败:", error));

    // 载入群聊聊天室的历史聊天记录
    loadChatHistory(chatroom_id);
  }
}

// 加载私人助手历史聊天记录
function loadPrivateChatHistory() {
  fetch(`http://localhost:8080/get_private_history/${user_id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        clearChatMessages();
        data.history.forEach((msg) => {
          // 插入历史消息
          insertMessage(
            msg.nickname,
            msg.message.split("@username")[0],
            msg.timestamp
          );
        });
      } else {
        console.error("加载历史聊天记录失败");
      }
    })
    .catch((error) => {
      console.error("加载历史聊天记录失败:", error);
    });
}

// 加载历史聊天记录
function loadChatHistory(roomId) {
  fetch(`http://localhost:8080/join_room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, invite_code: roomId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络响应错误");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        clearChatMessages();
        data.history.forEach((msg) => {
          // 插入历史消息
          insertMessage(
            msg.nickname,
            msg.message.split("@username")[0],
            msg.timestamp
          );
        });
      } else {
        console.error("加载历史聊天记录失败");
      }
    })
    .catch((error) => {
      console.error("加载历史聊天记录失败:", error);
    });
}

// 删除聊天室
function deleteChatRoom(event) {
  event.stopPropagation(); // 阻止事件冒泡，以防止触发selectRoom事件
  var roomElement = event.currentTarget.closest(".home_chat-item__Oblai");
  var roomId = roomElement.getAttribute("data-room-id");

  fetch("http://localhost:8080/delete_room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, room_id: roomId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        roomElement.remove();
        console.log(`聊天室 ${roomId} 已删除`);
      } else {
        alert(data.message || "删除聊天室失败");
      }
    })
    .catch((error) => {
      console.error("删除聊天室失败:", error);
    });
}

// 动态添加新的聊天室到侧边栏
function addChatRoomToSidebar(roomTitle, inviteCode) {
  var chatSidebar = document.getElementById("chat_side_bar");
  if (!chatSidebar) {
    console.error("侧边栏未找到");
    return;
  }
  var newRoom = document.createElement("div");
  newRoom.className = "home_chat-item__Oblai false";
  newRoom.setAttribute("data-room-id", inviteCode);
  newRoom.onclick = selectRoom;
  newRoom.id = `chat_room_${inviteCode}`;

  var titleDiv = document.createElement("div");
  titleDiv.className = "home_chat-item-title__sRstw";
  titleDiv.innerText = `${roomTitle} (${inviteCode})`;

  var infoDiv = document.createElement("div");
  infoDiv.className = "home_chat-item-info__9r6z_";

  var countDiv = document.createElement("div");
  countDiv.className = "home_chat-item-count____Lpy";
  countDiv.innerText = "群成员数量：0人";

  var deleteDiv = document.createElement("div");
  deleteDiv.className = "home_chat-item-delete__3qV5m";
  deleteDiv.onclick = deleteChatRoom;

  var deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash delete_icon";

  deleteDiv.appendChild(deleteIcon);
  infoDiv.appendChild(countDiv);
  newRoom.appendChild(titleDiv);
  newRoom.appendChild(infoDiv);
  newRoom.appendChild(deleteDiv);

  chatSidebar.appendChild(newRoom);
}

// 创建聊天室
function createRoom(event) {
  var roomName = document.getElementById("block_room_name").value;
  if (!roomName) {
    console.error("聊天室名称输入框未找到");
    return;
  }

  fetch("http://localhost:8080/create_room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, room_name: roomName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.invite_code) {
        alert(`聊天室创建成功，邀请码为：${data.invite_code}`);
        addChatRoomToSidebar(roomName, data.invite_code); // 显示聊天室名称和邀请码
        hideChatroomName(event);
      } else {
        console.error("聊天室创建失败，未收到邀请码");
      }
    })
    .catch((error) => {
      console.error("创建聊天室失败:", error);
    });
}

// 隐藏创建聊天室模态框
function hideChatroomName(event) {
  var modal = document.querySelector(".modal-mask4");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error("模态框未找到");
  }
}

// 显示创建聊天室模态框
function showChatroomName(event) {
  var modal = document.querySelector(".modal-mask4");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("模态框未找到");
  }
}

// 恢复聊天室信息
function restoreChatRooms() {
  fetch(`http://localhost:8080/get_user_rooms/${user_id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.rooms) {
        data.rooms.forEach((room) =>
          addChatRoomToSidebar(room.room_name, room.room_id)
        );
        var currentChatRoom = localStorage.getItem("currentChatRoom");
        if (currentChatRoom) {
          chatroom_id = currentChatRoom;
          document
            .querySelectorAll(".home_chat-item-title__sRstw")
            .forEach((item) => {
              if (item.innerText.includes(chatroom_id)) {
                item.parentElement.classList.add(
                  "home_chat-item-selected__b6eBe"
                );
                item.parentElement.classList.remove("false");
              }
            });
          document.querySelector(
            ".chat_chat-body-title__d2ItC .window-header-main-title"
          ).innerText = document
            .querySelector(
              `#chat_room_${chatroom_id} .home_chat-item-title__sRstw`
            )
            .innerText.split(" (")[0];
          if (chatroom_id === "private_assistant") {
            loadPrivateChatHistory();
          } else {
            loadChatHistory(chatroom_id);
          }
        }
      } else {
        console.error("未收到聊天室数据");
      }
    })
    .catch((error) => {
      console.error("获取用户聊天室失败:", error);
    });
}

// 插入消息到聊天框
function insertMessage(nickname, message, timestamp) {
  var chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }
  var messageElement = document.createElement("div");
  messageElement.className = "chat_chat-message-user__ZtTEj";
  messageElement.innerHTML = `
    <div class="chat_chat-message-container__O_X8_">
      <div class="chat_chat-message-header__Dny_K">
        <div class="chat_chat-message-avatar__3QeMq">
          <div class="user-avatar">
            <img src="img/User.png" alt="smiley" class="__EmojiPicker__ epr-emoji-img" loading="eager" style="font-size: 18px; height: 18px; width: 18px"/>
          </div>
        </div>
      </div>
      <div class="chat_chat-message-item__dKqMl">
        <div class="markdown-body" dir="auto" style="font-size: 14px">
          <p class="message_user" node="[object Object]" dir="auto">${nickname}: ${message}</p>
        </div>
        <div class="chat_chat-message-actions__H90hg">
          <div class="chat_chat-input-actions__mwYC_">
            <div class="chat_chat-input-action__DMW7Y clickable user" style="--icon-width: 16px; --full-width: 16px" onclick="message_copy(event)">
              <div class="chat_icon__Ly3TN">
                <i class="fas fa-copy copy_svg__icon"></i>
              </div>
              <div class="chat_text__TkPfN">复制</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat_chat-message-action-date__RsXTn">${timestamp}</div>
    </div>
  `;
  chatBody.appendChild(messageElement);
  scrollToBottom();
}

// 加入聊天室
function joinRoom() {
  var inviteCode = prompt("请输入邀请码:");

  fetch("http://localhost:8080/join_room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, invite_code: inviteCode }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        chatroom_id = data.chatroom_id;
        alert(`成功加入聊天室，ID为：${chatroom_id}`);
        addChatRoomToSidebar(data.room_name, chatroom_id); // 显示聊天室名称和邀请码
        ws.send("+@切换" + chatroom_id);
        data.history.forEach((msg) => {
          // 插入历史消息
          insertMessage(msg.nickname, msg.message, msg.timestamp);
        });
      } else {
        alert("邀请码无效或加入失败");
      }
    })
    .catch((error) => {
      console.error("加入聊天室失败:", error);
    });
}

// 添加@机器人
function add() {
  var tc = document.getElementById("messageText");
  var tclen = tc.value.length;
  tc.focus();
  str = "【@ 聊天机器人】";
  if (typeof document.selection != "undefined") {
    document.selection.createRange().text = str;
  } else {
    tc.value =
      // 获取光标的开始位置
      tc.value.substr(0, tc.selectionStart) +
      str +
      tc.value.substring(tc.selectionStart, tclen);
  }
}
// 初始化
initialize();
