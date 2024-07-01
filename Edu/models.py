from peewee import (
    Model,
    CharField,
    TextField,
    ForeignKeyField,
    DateField,
    DateTimeField,
    IntegerField,
    FloatField,
    SmallIntegerField,
    AutoField,
)
from database import database
from datetime import datetime


class BaseModel(Model):
    class Meta:
        database = database


class User(BaseModel):
    user_id = AutoField()
    hashed_password = CharField(null=False)
    email = CharField(unique=True, null=False)
    student_number = CharField(unique=True, null=False)
    university = CharField(null=False)
    college = CharField(null=False)
    major = CharField(null=False)
    class_id = IntegerField(null=False)
    role = CharField(null=False)
    name = CharField(null=False)
    time = DateTimeField(null=False)


class Course(BaseModel):
    course_id = AutoField()
    class_id = IntegerField(null=False)
    user_id = ForeignKeyField(User, backref="courses", null=False)
    course_id_teacher_id = ForeignKeyField(User, backref="teacher_courses", null=True)
    name = CharField(null=False)
    tech_desc = CharField(default="")
    start_time = DateTimeField(null=False)
    end_time = DateTimeField(null=False)
    status = SmallIntegerField(default=0)


class Assignment(BaseModel):
    assignment_id = AutoField()
    user_id = ForeignKeyField(User, backref="assignments", null=False)
    course_id = ForeignKeyField(Course, backref="assignments", null=False)
    title = CharField(null=False)
    description = TextField(null=True)
    release_date = DateField(null=False)
    deadline_date = DateField(null=False)


class AssignmentScore(BaseModel):
    scores_id = AutoField()
    user_id = ForeignKeyField(User, backref="scores", null=False)
    assignment_id = ForeignKeyField(Assignment, backref="scores", null=False)
    score = IntegerField(null=False)
    submission_date = DateField(null=False)


class KnowledgeBase(BaseModel):
    knowledge_base_id = AutoField()
    course_id = ForeignKeyField(Course, backref="knowledge_base", null=True)
    user_id = ForeignKeyField(User, backref="knowledge_base", null=True)
    knowledge_base_address = CharField(null=False)


class KnowledgeDocument(BaseModel):
    knowledge_documents_id = AutoField()
    knowledge_base_id = ForeignKeyField(KnowledgeBase, backref="documents", null=False)
    knowledge_documents_address = CharField(null=False)
    name = CharField(null=False)


class CourseTarget(BaseModel):
    course_target_id = AutoField()
    course_id = ForeignKeyField(Course, backref="targets", null=False)
    course_target_num = IntegerField(null=False)
    discribe = TextField(null=False)
    exam_pro = FloatField(null=False)
    discuss_pro = FloatField(null=False)
    hwk_pro = FloatField(null=False)
    score = FloatField(default=-1)


class AbilityAnalysis(BaseModel):
    ability_analysis_id = AutoField()
    user_id = ForeignKeyField(User, backref="ability_analysis", null=False)
    schedule_id = IntegerField(null=False)
    ability_1 = IntegerField(null=False)
    ability_2 = IntegerField(null=False)
    ability_3 = IntegerField(null=False)
    ability_4 = IntegerField(null=False)
    ability_5 = IntegerField(null=False)
    ability_6 = IntegerField(null=False)


class ChatRoom(BaseModel):
    id = AutoField()
    name = CharField(null=False)
    invite_code = CharField(unique=True, null=False)


class Message(BaseModel):
    id = AutoField()
    room = ForeignKeyField(ChatRoom, backref="messages", on_delete="CASCADE")
    user = ForeignKeyField(User, backref="messages", on_delete="CASCADE")
    message = TextField(null=False)
    timestamp = DateTimeField(default=datetime.now)


class UserRoom(BaseModel):
    id = AutoField()
    user = ForeignKeyField(User, backref="rooms", on_delete="CASCADE")
    room = ForeignKeyField(ChatRoom, backref="users", on_delete="CASCADE")


class Discuss(BaseModel):
    discuss_id = AutoField()
    room_id = ForeignKeyField(ChatRoom, backref="discussions", null=False)
    user_id = ForeignKeyField(User, backref="discussions", null=False)
    topic = TextField(null=False)
    describe = TextField(null=False)
    time = DateTimeField(null=False)
    avg_score = FloatField(default=-1)


class DiscussContent(BaseModel):
    content_id = AutoField()
    discuss_id = ForeignKeyField(Discuss, backref="contents", null=False)
    user_id = ForeignKeyField(User, backref="contents", null=False)
    content = TextField(null=False)
    score = FloatField(null=False)
    time = DateTimeField(null=False)


if __name__ == "__main__":
    # database.connect()
    # database.drop_tables([User, Course, CourseTarget, AbilityAnalysis, ChatRoom, Message, UserRoom, Discuss, DiscussContent])
    # database.create_tables([User, Course, CourseTarget, AbilityAnalysis, ChatRoom, Message, UserRoom, Discuss, DiscussContent])
    # 查询所有数据
    users = User.select()

    # 打印数据
    for user in users:
        print(user.__dict__)
