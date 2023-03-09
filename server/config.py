from dotenv import dotenv_values
import redis

env = dotenv_values(".env")

class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}:{}/{}'.format(
        env['DATABASE_USERNAME'],
        env['DATABASE_PASSWORD'],
        env['DATABASE_HOST'],
        env['DATABASE_PORT'],
        env['DATABASE_USERNAME']
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = env['SECRET_KEY']

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")