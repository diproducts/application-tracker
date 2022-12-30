from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

test_args = reqparse.RequestParser()
test_args.add_argument('arg1', type=int, help='First number', location='form') # substitute "form" with "args" to receive args in a URL query
test_args.add_argument('arg2', type=int, help='Second number', location='form')

api_args = reqparse.RequestParser()
api_args.add_argument('name', type=str, help='Enter your name')

class Test(Resource):
    # receives a string "data" and two integers in a GET request, returning data and the sum of integers in json, with custom status code 666
    def get(self, data):
        args = test_args.parse_args()
        return {'data': data, "sum": args['arg1'] + args['arg2']}, 666

class Name(Resource):
    def post(self):
        args = api_args.parse_args()
        if args['name'] == 'Dasha':
            return {'server response': f'Hello, {args["name"]}'}, 200
        else: 
            return {'server response': f'The name you sent me is not valid'}, 404

api.add_resource(Test, '/test/<string:data>')
api.add_resource(Name, '/api')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)