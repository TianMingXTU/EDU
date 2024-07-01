// ui.js
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

export {
  insertOwnMessage,
  insertOtherMessage,
  insertHistoryMessageTip,
  clearChatMessages,
  scrollToBottom,
  insertMessage,
};
