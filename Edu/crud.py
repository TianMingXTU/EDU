from peewee import DoesNotExist
from passlib.context import CryptContext
from models import (
    User,
    Course,
    Assignment,
    AssignmentScore,
    KnowledgeBase,
    KnowledgeDocument,
    CourseTarget,
    AbilityAnalysis,
    ChatRoom,
    Message,
    UserRoom,
    Discuss,
    DiscussContent,
)
from schemas import (
    UserCreate,
    CourseCreate,
    AssignmentCreate,
    AssignmentScoreCreate,
    KnowledgeBaseCreate,
    KnowledgeDocumentCreate,
    CourseTargetCreate,
    AbilityAnalysisCreate,
    ChatRoomCreate,
    MessageCreate,
    UserRoomCreate,
    DiscussCreate,
    DiscussContentCreate,
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# 用户相关的CRUD操作
def get_user(user_id: int):
    try:
        return User.get(User.user_id == user_id)
    except DoesNotExist:
        return None


def get_user_by_email(email: str):
    try:
        return User.get(User.email == email)
    except DoesNotExist:
        return None


def create_user(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User.create(
        email=user.email,
        hashed_password=hashed_password,
        student_number=user.student_number,
        university=user.university,
        college=user.college,
        major=user.major,
        class_id=user.class_id,
        role=user.role,
        name=user.name,
        time=user.time,
    )
    return db_user


# 课程相关的CRUD操作
def get_courses(skip: int = 0, limit: int = 10):
    return Course.select().offset(skip).limit(limit)


def create_course(course: CourseCreate):
    db_course = Course.create(
        class_id=course.class_id,
        user_id=course.user_id,
        course_id_teacher_id=course.course_id_teacher_id,
        name=course.name,
        tech_desc=course.tech_desc,
        start_time=course.start_time,
        end_time=course.end_time,
        status=course.status,
    )
    return db_course


# 作业相关的CRUD操作
def get_assignments(course_id: int):
    return Assignment.select().where(Assignment.course_id == course_id)


def create_assignment(assignment: AssignmentCreate):
    db_assignment = Assignment.create(
        user_id=assignment.user_id,
        course_id=assignment.course_id,
        title=assignment.title,
        description=assignment.description,
        release_date=assignment.release_date,
        deadline_date=assignment.deadline_date,
    )
    return db_assignment


# 作业评分相关的CRUD操作
def get_assignment_scores(assignment_id: int):
    return AssignmentScore.select().where(
        AssignmentScore.assignment_id == assignment_id
    )


def create_assignment_score(score: AssignmentScoreCreate):
    db_score = AssignmentScore.create(
        user_id=score.user_id,
        assignment_id=score.assignment_id,
        score=score.score,
        submission_date=score.submission_date,
    )
    return db_score


# 知识库相关的CRUD操作
def get_knowledge_base(course_id: int):
    return KnowledgeBase.select().where(KnowledgeBase.course_id == course_id)


def create_knowledge_base(base: KnowledgeBaseCreate):
    db_base = KnowledgeBase.create(
        course_id=base.course_id,
        user_id=base.user_id,
        knowledge_base_address=base.knowledge_base_address,
    )
    return db_base


# 知识文档相关的CRUD操作
def get_knowledge_documents(base_id: int):
    return KnowledgeDocument.select().where(
        KnowledgeDocument.knowledge_base_id == base_id
    )


def create_knowledge_document(doc: KnowledgeDocumentCreate):
    db_doc = KnowledgeDocument.create(
        knowledge_base_id=doc.knowledge_base_id,
        knowledge_documents_address=doc.knowledge_documents_address,
        name=doc.name,
    )
    return db_doc


# 课程目标相关的CRUD操作
def get_course_targets(course_id: int):
    return CourseTarget.select().where(CourseTarget.course_id == course_id)


def create_course_target(target: CourseTargetCreate):
    db_target = CourseTarget.create(
        course_id=target.course_id,
        course_target_num=target.course_target_num,
        discribe=target.discribe,
        exam_pro=target.exam_pro,
        discuss_pro=target.discuss_pro,
        hwk_pro=target.hwk_pro,
        score=target.score,
    )
    return db_target


# 能力分析相关的CRUD操作
def get_ability_analysis(user_id: int):
    return AbilityAnalysis.select().where(AbilityAnalysis.user_id == user_id)


def create_ability_analysis(analysis: AbilityAnalysisCreate):
    db_analysis = AbilityAnalysis.create(
        user_id=analysis.user_id,
        schedule_id=analysis.schedule_id,
        ability_1=analysis.ability_1,
        ability_2=analysis.ability_2,
        ability_3=analysis.ability_3,
        ability_4=analysis.ability_4,
        ability_5=analysis.ability_5,
        ability_6=analysis.ability_6,
    )
    return db_analysis


# 聊天室相关的CRUD操作
def get_chat_rooms(skip: int = 0, limit: int = 10):
    return ChatRoom.select().offset(skip).limit(limit)


def create_chat_room(room: ChatRoomCreate):
    db_room = ChatRoom.create(name=room.name, invite_code=room.invite_code)
    return db_room


# 消息相关的CRUD操作
def get_messages(room_id: int, skip: int = 0, limit: int = 10):
    return Message.select().where(Message.room == room_id).offset(skip).limit(limit)


def create_message(message: MessageCreate):
    db_message = Message.create(
        room=message.room,
        user=message.user,
        message=message.message,
        timestamp=message.timestamp,
    )
    return db_message


# 用户-聊天室关系相关的CRUD操作
def get_user_rooms(user_id: int):
    return UserRoom.select().where(UserRoom.user == user_id)


def create_user_room(user_room: UserRoomCreate):
    db_user_room = UserRoom.create(user=user_room.user, room=user_room.room)
    return db_user_room


# 讨论相关的CRUD操作
def get_discussions(room_id: int):
    return Discuss.select().where(Discuss.room_id == room_id)


def create_discussion(discuss: DiscussCreate):
    db_discuss = Discuss.create(
        room_id=discuss.room_id,
        user_id=discuss.user_id,
        topic=discuss.topic,
        describe=discuss.describe,
        time=discuss.time,
        avg_score=discuss.avg_score,
    )
    return db_discuss


# 讨论内容相关的CRUD操作
def get_discussion_contents(discuss_id: int):
    return DiscussContent.select().where(DiscussContent.discuss_id == discuss_id)


def create_discussion_content(content: DiscussContentCreate):
    db_content = DiscussContent.create(
        discuss_id=content.discuss_id,
        user_id=content.user_id,
        content=content.content,
        score=content.score,
        time=content.time,
    )
    return db_content
