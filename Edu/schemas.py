from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: str
    student_number: str
    university: str
    college: str
    major: str
    class_id: int
    role: str
    name: str
    time: datetime


class UserCreate(UserBase):
    password: str


class User(UserBase):
    user_id: int

    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    class_id: int
    user_id: int
    course_id_teacher_id: Optional[int]
    name: str
    tech_desc: Optional[str]
    start_time: datetime
    end_time: datetime
    status: Optional[int] = 0


class CourseCreate(CourseBase):
    pass


class Course(CourseBase):
    course_id: int

    class Config:
        from_attributes = True


class AssignmentBase(BaseModel):
    user_id: int
    course_id: int
    title: str
    description: Optional[str]
    release_date: datetime
    deadline_date: datetime


class AssignmentCreate(AssignmentBase):
    pass


class Assignment(AssignmentBase):
    assignment_id: int

    class Config:
        from_attributes = True


class AssignmentScoreBase(BaseModel):
    user_id: int
    assignment_id: int
    score: int
    submission_date: datetime


class AssignmentScoreCreate(AssignmentScoreBase):
    pass


class AssignmentScore(AssignmentScoreBase):
    scores_id: int

    class Config:
        from_attributes = True


class KnowledgeBaseBase(BaseModel):
    course_id: Optional[int]
    user_id: Optional[int]
    knowledge_base_address: str


class KnowledgeBaseCreate(KnowledgeBaseBase):
    pass


class KnowledgeBase(KnowledgeBaseBase):
    knowledge_base_id: int

    class Config:
        from_attributes = True


class KnowledgeDocumentBase(BaseModel):
    knowledge_base_id: int
    knowledge_documents_address: str
    name: str


class KnowledgeDocumentCreate(KnowledgeDocumentBase):
    pass


class KnowledgeDocument(KnowledgeDocumentBase):
    knowledge_documents_id: int

    class Config:
        from_attributes = True


class CourseTargetBase(BaseModel):
    course_id: int
    course_target_num: int
    discribe: str
    exam_pro: float
    discuss_pro: float
    hwk_pro: float
    score: Optional[float] = -1


class CourseTargetCreate(CourseTargetBase):
    pass


class CourseTarget(CourseTargetBase):
    course_target_id: int

    class Config:
        from_attributes = True


class AbilityAnalysisBase(BaseModel):
    user_id: int
    schedule_id: int
    ability_1: int
    ability_2: int
    ability_3: int
    ability_4: int
    ability_5: int
    ability_6: int


class AbilityAnalysisCreate(AbilityAnalysisBase):
    pass


class AbilityAnalysis(AbilityAnalysisBase):
    ability_analysis_id: int

    class Config:
        from_attributes = True


class ChatRoomBase(BaseModel):
    name: str
    invite_code: str


class ChatRoomCreate(ChatRoomBase):
    pass


class ChatRoom(ChatRoomBase):
    id: int

    class Config:
        from_attributes = True


class MessageBase(BaseModel):
    room: int
    user: int
    message: str
    timestamp: datetime


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    id: int

    class Config:
        from_attributes = True


class UserRoomBase(BaseModel):
    user: int
    room: int


class UserRoomCreate(UserRoomBase):
    pass


class UserRoom(UserRoomBase):
    id: int

    class Config:
        from_attributes = True


class DiscussBase(BaseModel):
    room_id: int
    user_id: int
    topic: str
    describe: str
    time: datetime
    avg_score: Optional[float] = -1


class DiscussCreate(DiscussBase):
    pass


class Discuss(DiscussBase):
    discuss_id: int

    class Config:
        from_attributes = True


class DiscussContentBase(BaseModel):
    discuss_id: int
    user_id: int
    content: str
    score: float
    time: datetime


class DiscussContentCreate(DiscussContentBase):
    pass


class DiscussContent(DiscussContentBase):
    content_id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    student_number: str
    role: str