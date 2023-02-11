import Joi from 'joi';
const { joiPasswordExtendCore } = require('joi-password');
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '@/styles/Login.module.css';

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

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm(
        {
        mode: 'onSubmit',
        defaultValues: {
                email: '',
                password: ''
              },
        resolver: joiResolver(schema)
    });

    const onSubmit = data => console.log(data);

    // state for determine if the fields were correctly filled
    const [correctEmail, setCorrectEmail] = useState(false);
    const [correctPassword, setCorrectPassword] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    // changing submit button to be disabled or not depending on the input fields
    const handleChange = e => {
        const field = e.target.name;
        const notValidated = field === 'email' ? schema.validate({email: e.target.value}).error : 
                                                schema.validate({password: e.target.value}).error;
        if (notValidated) {
            field === 'email' ? setCorrectEmail(false) : setCorrectPassword(false);
            setDisabledButton(true);
        } else {
            field === 'email' ? setCorrectEmail(true) : setCorrectPassword(true);
            if (correctEmail && correctPassword) setDisabledButton(false);
        }
        return;
    }

    return (
        <>
            <Head>
                <title>Log In | Application Tracker</title>
                <meta name="description" content="Application tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter&family=Noto+Sans:wght@500&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <main className={styles.container}>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <span className={styles.span}>aT</span>
                    <h1>Log in</h1>
                    <label>
                        email:
                        <input
                            className={styles.input} 
                            {...register('email', { required: true, onChange: (e) => handleChange(e)
                            })}
                        />
                    </label>
                    <label>
                        password:
                        <input {...register('password', 
                                { required: true, onChange: (e) => handleChange(e) })} 
                            type='password' 
                            className={styles.input} 
                        />
                    </label>
                    <div className={styles.submitGroup}>
                        <input className={styles.submit} disabled={disabledButton} type='submit' value="LOG IN" />
                        <p>Forgot password?</p>
                    </div>
                </form>

                <Footer />
            </main>
        </>
    )
}