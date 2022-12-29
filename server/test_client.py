import requests

BASE = 'http://127.0.0.1:5000/'


#response = requests.get(BASE + 'test/this_string_should_be_returned', data={'arg1': 1, 'arg2': 2}) # substitute "data" with "params" to send args in a URL query
response = requests.post(BASE + 'api', json={'name': 'Dasha'})
print(response.json())