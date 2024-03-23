import * as EmailValidator from 'email-validator';

function Schema() {
    this.email = {};
    this.password = { type: 'string', empty: false, reg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ };
    this.name = { reg: /[^!#$%^&*()?\s]/ };
    this.passwordConfirmed = {};
    this.remember = { type: 'boolean' }
}

Schema.prototype.validate = function (input, mode = 'singup') {
    if (mode === 'login') {
        for (const [key, value] of Object.entries(input)) {
            if (key === 'email') {
                if (!EmailValidator.validate(value)) return false;
            } else if (key !== 'remember') {
                if (value.length <= 0 || typeof value != 'string') return false;
            }
        }
        return true;
    }

    for (const [key, value] of Object.entries(input)) {
        if (key === 'email') {
            if (!EmailValidator.validate(value)) return false;
        }
        else if (key === 'password' || key === 'name') {
            if (!this[key].reg.test(value)) return false;
        } else {
            if (value !== input.password || value.length === 0) return false
        }
    }
    return true;
}

const schema = new Schema();

export default schema;