from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from datetime import datetime
import secrets

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
mail = Mail()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=True)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(255), nullable=True)
    email_confirmed = db.Column(db.Boolean, nullable=False, default=False)
    secret_key = db.Column(db.String(32), nullable=False)
    
    applications = db.relationship(
        'Application', backref='user', lazy='select')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.secret_key = secrets.token_hex(16)
        self.password = bcrypt.generate_password_hash(self.password).decode('utf-8')
    
    def send_validation_link(self):
        self.token = self.secret_key + '-' + str(self.id)
        #validation_mail(self.email, self.token) redo with flask-mail
  
    def __repr__(self):
        return f'<User id: {self.id}, email: {self.email}>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).one_or_none()


class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    company_name = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    cv = db.Column(db.String(255), nullable=True)
    cover_letter = db.Column(db.String(255), nullable=True)
    application_link = db.Column(db.String(255), nullable=True)

    phases = db.relationship(
        'ApplicationPhase', backref='application', lazy='select')

    def __repr__(self):
        return f'<Application id: {self.id}, company_name: {self.company_name}, user_id: {self.user_id}>'

class ApplicationPhase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('application.id'))
    phase_name = db.Column(db.String(255), nullable=False)
    phase_date = db.Column(db.DateTime, default=datetime.utcnow)
    contact = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    feedback_sent = db.Column(db.Boolean, nullable=False, default=False)
    offered_salary = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<ApplicationPhase id: {self.id}, phase_name: {self.phase_name}, application_id: {self.application_id}>'
