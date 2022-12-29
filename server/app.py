from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

test_args = reqparse.RequestParser()
test_args.add_argument('arg1', type=int, help='First number', location='form') # substitute "form" with "args" to receive args in a URL query
test_args.add_argument('arg2', type=int, help='Second number', location='form')

class Test(Resource):
    # receives a string "data" and two integers in a GET request, returning data and the sum of integers in json, with custom status code 666
    def get(self, data):
        args = test_args.parse_args()
        return {'data': data, "sum": args['arg1'] + args['arg2']}, 666

api.add_resource(Test, '/test/<string:data>')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)