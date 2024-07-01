from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    users,
    courses,
    assignments,
    assignment_scores,
    knowledge_base,
    knowledge_documents,
    course_target,
    ability_analysis,
    chat,
    room,
    chat_room_user,
    discuss,
    discuss_content,
)

app = FastAPI()

# 允许的跨域请求源
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:5501",  # 允许的前端地址
    "http://localhost:5501",
    # 添加其他需要的来源
    '*'
]

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含各个路由模块
app.include_router(users.router)
app.include_router(courses.router)
app.include_router(assignments.router)
app.include_router(assignment_scores.router)
app.include_router(knowledge_base.router)
app.include_router(knowledge_documents.router)
app.include_router(course_target.router)
app.include_router(ability_analysis.router)
app.include_router(chat.router)
app.include_router(room.router)
app.include_router(chat_room_user.router)
app.include_router(discuss.router)
app.include_router(discuss_content.router)


@app.get("/")
def read_root():
    return {"message": "欢迎使用教育辅助系统"}
