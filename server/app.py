from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from database import Database

# defining flask application
app = Flask(__name__)
api = Api(app)
CORS(app)

# defining arguments
test_args = reqparse.RequestParser()
test_args.add_argument('arg1', type=int, help='First number', location='form') # substitute "form" with "args" to receive args in a URL query
test_args.add_argument('arg2', type=int, help='Second number', location='form')

api_args = reqparse.RequestParser()
api_args.add_argument('name', type=str, help='Enter your name')

registration_args = reqparse.RequestParser()
registration_args.add_argument('email', type=str, help='Email of the user')
registration_args.add_argument('password', type=str, help='Password of the user')
registration_args.add_argument('name', type=str, help='Name of the user')

# defining api classes
class Name(Resource):
    def post(self):
        args = api_args.parse_args()
        if args['name'] == 'Dasha':
            return {'server response': f'Hello, {args["name"]}'}, 200
        else: 
            return {'server response': f'The name you sent me is not valid'}, 404

class Registration(Resource):
    def post(self):
        args = registration_args.parse_args()
        result = d.create_user(args['email'], args['password'], args['name'])
        return result
        

api.add_resource(Name, '/api')
api.add_resource(Registration, '/create_user')


if __name__ == '__main__':
    # creating database object
    d = Database('server/database.db')
    # running the application
    app.run(debug=True, host='0.0.0.0', port=5000)
