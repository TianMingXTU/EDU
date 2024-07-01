// fileUpload.js

// 初始化文件上传
function initializeFileUpload() {
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");

  if (!fileInput || !uploadButton) {
    console.error("文件输入框或上传按钮未找到");
    return;
  }

  uploadButton.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (file) {
      uploadFile(file);
    } else {
      alert("请选择要上传的文件");
    }
  });
}

// 上传文件
function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("文件上传成功");
        // 处理文件上传成功后的操作，如将文件显示在聊天框中
        displayUploadedFile(file.name, data.fileUrl);
      } else {
        alert("文件上传失败");
      }
    })
    .catch((error) => {
      console.error("文件上传失败:", error);
      alert("文件上传失败，请重试");
    });
}

// 显示上传的文件
function displayUploadedFile(fileName, fileUrl) {
  const chatBody = document.getElementsByClassName("chat_chat-body__QFv5x")[0];
  if (!chatBody) {
    console.error("聊天主体未找到");
    return;
  }

  const fileElement = document.createElement("div");
  fileElement.className = "chat_chat-message-file__ZtTEj";
  fileElement.innerHTML = `
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
            <p class="message_file" dir="auto">
              <a href="${fileUrl}" target="_blank">${fileName}</a>
            </p>
          </div>
        </div>
      </div>
    `;

  chatBody.appendChild(fileElement);
  scrollToBottom();
}

export { initializeFileUpload };
