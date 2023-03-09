from flask import Flask, session
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_session import Session
from flask_login import login_required, current_user, login_user, logout_user
from config import Config
from models import db, login_manager, bcrypt, User

# defining flask application
app = Flask(__name__)
api = Api(app)
app.config.from_object(Config)
db.init_app(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
login_manager.init_app(app)
bcrypt.init_app(app)

# defining argument parsers
registration_args = reqparse.RequestParser()
registration_args.add_argument('email', type=str, help='Email of the user')
registration_args.add_argument('password', type=str, help='Password of the user')
registration_args.add_argument('name', type=str, help='Name of the user')

login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, help='Email of the user')
login_args.add_argument('password', type=str, help='Password of the user')
login_args.add_argument('remember', type=bool, help='Do we need to remember the user')

# defining api classes
class Registration(Resource):
    def post(self):
        args = registration_args.parse_args()
        user_exists = User.query.filter_by(email=args['email']).first()
        if user_exists:
            return {"error": "EMAIL_OCCUPIED"}, 401
        try:
            u = User(email=args['email'], password=args['password'], name=args['name'])
            db.session.add(u)
            db.session.commit()
            #u.send_validation_link()
            login_user(u)
            return {"response": "USER_CREATED", 'user_id': u.id}, 201
        except Exception as e:
            return {"error": str(e)}, 400
        

class Validation(Resource):
    def get(self, token: str):
        secret_key, user_id = token.split('-')
        u = User.query.filter_by(id=user_id, secret_key=secret_key, email_confirmed=0).first()
        if not u:
            return {"error": "ERROR_OCCURED"}, 400
        u.email_confirmed = True
        db.session.add(u)
        db.session.commit()
        return {"response": "EMAIL_CONFIRMED"}


class Login(Resource):
    def post(self):
        args = login_args.parse_args()
        u = User.query.filter_by(email=args['email']).first()
        if u and bcrypt.check_password_hash(u.password, args['password']):
            login_user(u, remember=args['remember'])
            return {"response": "ACCESS_ALLOWED"}, 200
        else:
            return {"error": "ACCESS_DENIED"}, 401            


class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return {"response": "Successfuly logged out"}, 200
        

class CheckIfLoggedIn(Resource):
    @login_required
    def get(self):
        u = current_user
        return {"response": "You are logged in! :)", "email": u.email, "name": u.name}


# DEBUG classes
class GetUsers(Resource):
    def get(self):
        users = User.query.all()
        json = {}
        for user in users:
            json[user.id] = {"email": user.email, "name": user.name, "registration_date": str(user.registration_date), "email_confirmed": user.email_confirmed}
        return json


api.add_resource(Registration, '/api/register')
api.add_resource(Validation, '/api/confirm_mail/<string:token>')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(CheckIfLoggedIn, '/api/check_if_logged_in')
# DEBUG resources
api.add_resource(GetUsers, '/api/get_users')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
    
