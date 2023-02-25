import * as EmailValidator from 'email-validator';

function Schema() {
    this.email = {};
    this.password = {type: 'string', empty: false, reg: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/};
    this.username = {reg: /[^!#$%^&*()?\s]/};
    this.passwordConfirmed = {};
}

Schema.prototype.validate = function(input, mode = 'singup') {
    if (mode === 'login') {
        for (const [key, value] of Object.entries(input)) {
            if (key === 'email') {
                if (!EmailValidator.validate(value)) return false;
            } else {
                if (value.length <= 0 || typeof value != 'string') return false;
            }
        }
        return true;
    }
    for (const [key, value] of Object.entries(input)) {
        if (key === 'email') {
            if (!EmailValidator.validate(value)) return false;
        }
        else if (key === 'password' || key === 'username') {
            if (!this[key].reg.test(value)) return false;
        } else {
            if (value != input.password || value.length === 0) return false
        }
    }
    return true;
}

const schema = new Schema();

export default schema;