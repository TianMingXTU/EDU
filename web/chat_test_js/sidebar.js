let currentRoomId = "private_assistant";
const chatRooms = {
  private_assistant: {
    roomName: "你的私人助手",
    inviteCode: "private_assistant",
  },
};

// 通用事件处理器添加函数
function addEventListeners(selectors, event, handler) {
  document.querySelectorAll(selectors).forEach((item) => {
    item.addEventListener(event, handler);
  });
}

// 选择聊天房间
function selectRoom(event) {
  event.stopPropagation();
  const roomId = event.currentTarget.getAttribute("data-room-id");
  highlightRoom(roomId);
  initializeChatForRoom(roomId);
}

// 删除聊天房间
function deleteChatRoom(event) {
  event.stopPropagation();
  const roomElement = event.currentTarget.closest(".home_chat-item__Oblai");
  const roomId = roomElement.getAttribute("data-room-id");
  if (confirm(`确定要删除房间: ${roomId} 吗？`)) {
    delete chatRooms[roomId];
    roomElement.remove();
    alert(`已删除房间: ${roomId}`);
    if (roomId === currentRoomId) {
      currentRoomId = "private_assistant";
      highlightRoom(currentRoomId);
      initializeChatForRoom(currentRoomId);
    }
  }
}

// 加入聊天房间
function joinRoom(event) {
  event.stopPropagation();
  const inviteCode = prompt("请输入邀请码:");
  if (inviteCode) {
    const roomName = `聊天室_${inviteCode}`;
    const roomId = inviteCode;
    const displayName = `${roomName} (${inviteCode})`;
    chatRooms[roomId] = { roomName, inviteCode };
    addChatRoomToList(roomId, displayName);
    highlightRoom(roomId);
    initializeChatForRoom(roomId);
  }
}

// 创建新聊天房间
function createChatroomName(event) {
  event.stopPropagation();
  const roomName = prompt("请输入新的聊天房间名称:");
  if (roomName) {
    const inviteCode = generateInviteCode();
    const roomId = inviteCode;
    const displayName = `${roomName} (${inviteCode})`;
    chatRooms[roomId] = { roomName, inviteCode };
    addChatRoomToList(roomId, displayName);
    highlightRoom(roomId);
    initializeChatForRoom(roomId);
    alert(`已创建新房间: ${roomName}, 邀请码: ${inviteCode}`);
  }
}

// 生成邀请码
function generateInviteCode() {
  return Math.random().toString(36).substring(2, 10);
}

// 显示聊天室
function addChatRoomToList(roomId, roomName) {
  const chatSideBar = document.getElementById("chat_side_bar");
  const newRoom = document.createElement("div");
  newRoom.className = "home_chat-item__Oblai";
  newRoom.setAttribute("data-room-id", roomId);
  newRoom.innerHTML = `
    <div class="home_chat-item-title__sRstw">${roomName}</div>
    <div class="home_chat-item-info__9r6z_">
      <div class="home_chat-item-count____Lpy">群成员数量：1人</div>
    </div>
    <div class="home_chat-item-delete__3qV5m">
      <i class="fas fa-trash delete_icon"></i>
    </div>`;

  newRoom
    .querySelector(".home_chat-item-title__sRstw")
    .addEventListener("click", selectRoom);
  newRoom
    .querySelector(".home_chat-item-delete__3qV5m")
    .addEventListener("click", deleteChatRoom);

  chatSideBar.appendChild(newRoom);
}

// 高亮选择的聊天室
function highlightRoom(roomId) {
  document.querySelectorAll(".home_chat-item__Oblai").forEach((item) => {
    item.style.boxShadow = "none";
    item.style.border = "none";
  });

  const selectedRoom = document.querySelector(`[data-room-id="${roomId}"]`);
  if (selectedRoom) {
    selectedRoom.style.boxShadow = "0 0 15px rgba(0, 123, 255, 0.7)";
    selectedRoom.style.border = "1px solid rgba(0, 123, 255, 0.7)";
    currentRoomId = roomId;
  }
}

// 初始化聊天房间
function initializeChatForRoom(roomId) {
  const roomInfo = chatRooms[roomId];
  if (roomInfo) {
    console.log(`初始化聊天室: ${roomInfo.inviteCode}`);
    // 这里添加实际的初始化逻辑，例如加载聊天记录等
  } else {
    console.error(`无法初始化聊天室: ${roomId}`);
  }
}

// 初始化默认选择聊天室
function initializeDefaultRoom() {
  highlightRoom(currentRoomId);
  initializeChatForRoom(currentRoomId);
}

// 初始化侧边栏
function initializeSidebar() {
  addEventListeners(".home_chat-item__Oblai", "click", selectRoom);
  addEventListeners(".home_chat-item-delete__3qV5m", "click", deleteChatRoom);

  initializeDefaultRoom();
}

// 监听按钮事件
function initializeButtons() {
  document.querySelectorAll('[onclick="joinRoom(event)"]').forEach((button) => {
    button.addEventListener("click", joinRoom);
  });

  document
    .querySelectorAll('[onclick="createChatroomName(event)"]')
    .forEach((button) => {
      button.addEventListener("click", createChatroomName);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSidebar();
  initializeButtons();
});
