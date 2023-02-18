import Joi from 'joi';
const { joiPasswordExtendCore } = require('joi-password');
import { joiResolver } from '@hookform/resolvers/joi';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: joiPassword
                .string()
                .min(8)
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(1)
                .noWhiteSpaces()
})

export default function SignUp() {
    return (
        <div>Sign up here</div>
    )
}