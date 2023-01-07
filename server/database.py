import sqlite3
import hashlib
import secrets
from mail import send_validation_link

class Database:
    def __init__(self, path: str):
        self.con = sqlite3.connect(path, check_same_thread=False)
        self.cur = self.con.cursor()

    def execute_command(self, command: str):
        self.cur.execute(command)
        self.con.commit()
    
    def execute_query(self, query: str):
        res = self.cur.execute(query).fetchall()
        return res
    
    def close_connection(self):
        self.con.close()

    def create_user(self, email: str, password: str, name: str):
        occupied_emails = self.execute_query('SELECT email FROM users')
        occupied_emails = [email[0] for email in occupied_emails]
        if email in occupied_emails:
            return {"response": "EMAIL_OCCUPIED"}, 400
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        secret_key = secrets.token_hex(16)
        query = f'''
        INSERT INTO users (email, password, name, registration_date, email_confirmed, secret_key)
        VALUES ('{email}', '{hashed_password}', '{name}', datetime('now'), false, '{secret_key}')
        '''
        self.cur.execute(query)
        self.con.commit()
        # creating token link
        user_id: str = str(self.cur.execute(f'SELECT id FROM users WHERE secret_key = "{secret_key}"').fetchone()[0])
        token: str = secret_key + '-' + user_id
        send_validation_link(email, token) # comment this line to not send the confirmation email
        return {"response": "USER_CREATED"}, 201

    def validate_email(self, token: str):
        secret_key, user_id = token.split('-')
        result = self.cur.execute(f'SELECT * FROM users WHERE id = {user_id} AND secret_key = "{secret_key}" AND email_confirmed = 0').fetchone()
        if result:
            self.cur.execute(f'UPDATE users SET email_confirmed = 1 WHERE id = {user_id}')
            self.con.commit()
            return 'Your email is confirmed. You may close this page.'
        else:
            return 'An error occured.'
        

create_table = '''
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR,
    registration_date TIMESTAMP NOT NULL,
    status VARCHAR,
    email_confirmed BOOLEAN NOT NULL,
    secret_key VARCHAR
)
'''

if __name__ == '__main__':
    d = Database('server/database.db')
    #d.execute_command('DELETE FROM users')
    #print(d.execute_query('SELECT * FROM users'))
    d.close_connection()