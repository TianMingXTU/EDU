from peewee import *


# 定义模型类
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


# 获取数据库连接的上下文管理器
@contextmanager
def get_db():
    try:
        database.connect()
        yield database
    finally:
        if not database.is_closed():
            database.close()


# 打印表中的所有数据
with get_db():
    # 查询所有数据
    users = User.select()

    # 打印数据
    for user in users:
        print(user.__dict__)
