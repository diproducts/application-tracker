#from app import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import secrets
import bcrypt
from mail import validation_mail

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=True)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(120), nullable=True)
    email_confirmed = db.Column(db.Boolean, nullable=False, default=False)
    secret_key = db.Column(db.String(16), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.generate_secret_key()
        self.generate_password_hash()
    
    def generate_secret_key(self):
        self.secret_key = secrets.token_hex(16)

    def generate_password_hash(self):
        self.password = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt())
    
    def send_validation_link(self):
        self.token = self.secret_key + '-' + str(self.id)
        validation_mail(self.email, self.token)
  
    def __repr__(self):
        return f'<User id: {self.id}, email: {self.email}>'