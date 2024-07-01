
### 项目结构及文件说明

```
edu_assist_system/
│
├── main.py
├── models.py
├── schemas.py
├── crud.py
├── database.py
├── routers/
│   ├── users.py
│   ├── courses.py
│   ├── assignments.py
│   ├── assignment_scores.py
│   ├── knowledge_base.py
│   ├── knowledge_documents.py
│   ├── course_target.py
│   ├── ability_analysis.py
│   ├── chat.py
│   ├── room.py
│   ├── chat_room_user.py
│   ├── discuss.py
│   └── discuss_content.py
└── __init__.py
```

### 顶层文件

#### 1. main.py

- **功能**: 项目的入口文件，创建 FastAPI 应用并包含所有的路由模块。
- **内容**:
  - 导入 FastAPI 和各个路由模块。
  - 设置 CORS 中间件以允许跨域请求。
  - 包含所有路由模块，使得 API 可以处理不同的请求路径。
  - 定义根路径的简单响应。

#### 2. models.py

- **功能**: 定义数据库模型。
- **内容**:
  - 使用 Peewee ORM 定义数据库表模型。
  - 每个模型对应数据库中的一张表，并定义了表中的字段和关系。
  - `BaseModel`是所有模型的基类，包含了数据库连接信息。

#### 3. schemas.py

- **功能**: 定义 Pydantic 模式（Schemas），用于请求和响应的数据验证。
- **内容**:
  - 使用 Pydantic 定义数据模式，用于验证和序列化请求和响应数据。
  - 每个模式对应一个数据库模型，用于创建、读取和更新数据时的数据结构。

#### 4. crud.py

- **功能**: 定义数据库的 CRUD 操作（Create, Read, Update, Delete）。
- **内容**:
  - 包含针对每个模型的数据库操作函数。
  - 每个函数实现了特定的 CRUD 操作，如创建用户、获取课程列表、更新作业等。
  - 使用 Peewee 的查询 API 来实现数据库操作。

#### 5. database.py

- **功能**: 配置和管理数据库连接。
- **内容**:
  - 定义数据库连接参数。
  - 创建数据库连接对象。
  - 提供数据库连接上下文管理器，以便在请求生命周期中管理数据库连接。

### 路由文件（routers/目录）

每个路由文件都定义了特定资源的 API 端点，负责处理相应的 HTTP 请求。

#### 1. routers/users.py

- **功能**: 用户相关的 API 端点。
- **内容**:
  - 创建用户（POST 请求）。
  - 获取用户信息（GET 请求）。

#### 2. routers/courses.py

- **功能**: 课程相关的 API 端点。
- **内容**:
  - 创建课程（POST 请求）。
  - 获取课程列表（GET 请求）。

#### 3. routers/assignments.py

- **功能**: 作业相关的 API 端点。
- **内容**:
  - 创建作业（POST 请求）。
  - 获取课程的作业列表（GET 请求）。

#### 4. routers/assignment_scores.py

- **功能**: 作业评分相关的 API 端点。
- **内容**:
  - 创建作业评分（POST 请求）。
  - 获取作业的评分列表（GET 请求）。

#### 5. routers/knowledge_base.py

- **功能**: 知识库相关的 API 端点。
- **内容**:
  - 创建知识库条目（POST 请求）。
  - 获取课程的知识库条目列表（GET 请求）。

#### 6. routers/knowledge_documents.py

- **功能**: 知识文档相关的 API 端点。
- **内容**:
  - 创建知识文档条目（POST 请求）。
  - 获取知识库的文档列表（GET 请求）。

#### 7. routers/course_target.py

- **功能**: 课程目标相关的 API 端点。
- **内容**:
  - 创建课程目标条目（POST 请求）。
  - 获取课程的目标列表（GET 请求）。

#### 8. routers/ability_analysis.py

- **功能**: 学生能力分析相关的 API 端点。
- **内容**:
  - 创建能力分析条目（POST 请求）。
  - 获取用户的能力分析列表（GET 请求）。

#### 9. routers/chat.py

- **功能**: 聊天消息相关的 API 端点。
- **内容**:
  - 创建聊天消息（POST 请求）。
  - 获取聊天室的消息列表（GET 请求）。

#### 10. routers/room.py

- **功能**: 聊天室相关的 API 端点。
- **内容**:
  - 创建聊天室（POST 请求）。
  - 获取班级的聊天室列表（GET 请求）。

#### 11. routers/chat_room_user.py

- **功能**: 聊天室用户相关的 API 端点。
- **内容**:
  - 添加用户到聊天室（POST 请求）。
  - 获取聊天室的用户列表（GET 请求）。

#### 12. routers/discuss.py

- **功能**: 讨论主题相关的 API 端点。
- **内容**:
  - 创建讨论主题（POST 请求）。
  - 获取聊天室的讨论主题列表（GET 请求）。

#### 13. routers/discuss_content.py

- **功能**: 讨论内容相关的 API 端点。
- **内容**:
  - 创建讨论内容（POST 请求）。
  - 获取讨论主题的内容列表（GET 请求）。

### 其他文件

#### **init**.py

- **功能**: 标识该目录为一个 Python 包。
- **内容**:
  - 通常为空，但可以包含包的初始化代码。
