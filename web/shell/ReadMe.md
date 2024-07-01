好的，我会为你创建一个详细的 `README.md` 文档，说明各个部分的功能和用法。

### `README.md`

```markdown
# WebSocket 实时聊天室

这是一个基于 WebSocket 实现的实时聊天室项目。项目包括连接 WebSocket 服务器、处理消息、管理聊天室、更新界面和文件上传功能。代码已经模块化，方便维护和扩展。

## 文件结构

```
.
├── index.js
├── websocket.js
├── message.js
├── chatroom.js
├── ui.js
├── utils.js
└── fileUpload.js
```

## 功能模块说明

### `index.js`

主文件，初始化各个模块，并绑定事件监听器。

### `websocket.js`

处理 WebSocket 连接和消息发送。

### `message.js`

处理 WebSocket 消息和聊天消息。

### `chatroom.js`

管理聊天室，包括加载历史记录和加入聊天室。

### `ui.js`

更新界面，包括插入消息、清除消息和滚动到底部。

### `utils.js`

包含初始化和其他实用函数。

### `fileUpload.js`

添加文件上传功能。

## HTML 修改

确保你的 HTML 文件中包含以下元素来支持文件上传功能：

```html
<!-- 在合适的位置添加文件上传的 HTML 元素 -->
<input type="file" id="fileInput">
<button id="uploadButton">上传文件</button>
```

## 运行项目

1. 确保服务器运行在 `localhost:8080` 并支持相应的 API 端点。
2. 在浏览器中打开 HTML 文件。
3. 输入昵称连接 WebSocket。
4. 选择或创建聊天室，发送消息和文件。

```