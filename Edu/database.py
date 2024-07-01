from peewee import MySQLDatabase
from contextlib import contextmanager

# 请根据你的数据库配置更改这些参数
DATABASE_NAME = "chatchat"
USER = "root"
PASSWORD = "qin2002."
HOST = "localhost"
PORT = 3306

database = MySQLDatabase(
    DATABASE_NAME, user=USER, password=PASSWORD, host=HOST, port=PORT
)



@contextmanager
def get_db():
    try:
        database.connect()
        yield database
    finally:
        if not database.is_closed():
            database.close()
