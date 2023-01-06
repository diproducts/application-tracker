import sqlite3
import hashlib

class Database:
    def __init__(self, path):
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

    def create_user(self, email, password, name):
        occupied_emails = self.execute_query('SELECT email FROM users')
        occupied_emails = [email[0] for email in occupied_emails]
        if email in occupied_emails:
            return {"response": "EMAIL_OCCUPIED"}, 400
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        query = f'''
        INSERT INTO users (email, password, name, registration_date, email_confirmed)
        VALUES ('{email}', '{hashed_password}', '{name}', datetime('now'), false)
        '''
        self.cur.execute(query)
        self.con.commit()
        return {"response": "USER_CREATED"}, 201

create_table = '''
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR,
    registration_date TIMESTAMP NOT NULL,
    status VARCHAR,
    email_confirmed BOOLEAN NOT NULL
)
'''

if __name__ == '__main__':
    d = Database('server/database.db')
    #d.execute_command('DELETE FROM users')
    #print(d.execute_query('SELECT * FROM users'))
    d.close_connection()