// chatroom.js
import { insertMessage, addChatRoomToSidebar } from "./ui.js";

// 加载私人助手历史聊天记录
function loadPrivateChatHistory(user_id) {
  fetch(`http://localhost:8080/get_private_history/${user_id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        clearChatMessages();
        data.history.forEach((msg) => {
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

// 加载群聊历史聊天记录
function loadChatHistory(chatroom_id) {
  fetch(`http://localhost:8080/join_room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, invite_code: chatroom_id }),
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

// 加入聊天室
function joinRoom(user_id, inviteCode) {
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
        addChatRoomToSidebar(data.room_name, chatroom_id);
        ws.send("+@切换" + chatroom_id);
        data.history.forEach((msg) => {
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

export { loadPrivateChatHistory, loadChatHistory, joinRoom };
