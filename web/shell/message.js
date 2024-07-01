// message.js
import {
  insertOwnMessage,
  insertOtherMessage,
  insertHistoryMessageTip,
  clearChatMessages,
  scrollToBottom,
} from "./ui.js";
import { loadPrivateChatHistory, loadChatHistory } from "./chatroom.js";

// 处理WebSocket接收到的消息
function handleMessage(event, chatroom_id, nickname) {
  var message = String(event.data);

  if (message.includes("@member_number")) {
    updateMemberCount(message);
  } else if (message.includes(`+@chatroom_id${chatroom_id}`)) {
    processChatMessage(message, nickname);
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

// 处理聊天消息
function processChatMessage(message, nickname) {
  var cleanMessage = message.split("+@chatroom_id")[0];
  var isOwn = isOwnMessage(cleanMessage, nickname);

  if (isOwn) {
    insertOwnMessage(cleanMessage);
  } else {
    insertOtherMessage(cleanMessage);
  }
}

// 判断是否为自己的消息
function isOwnMessage(message, nickname) {
  return (
    message.includes("【你 ") ||
    message.includes("你:") ||
    message.includes(`${nickname}:`)
  );
}

export { handleMessage, processChatMessage, isOwnMessage };
