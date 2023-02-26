import styles from '@/styles/Login.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/footer';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import schema from '../helper/validator';

const API_URI = process.env.apiURL;

export default function SignUp() {
    const router = useRouter();
    const { register, formState, handleSubmit, getValues } = useForm(
        {
        mode: 'onSubmit',
        defaultValues: {
                username: '',
                email: '',
                password: '',
                passwordConfirmed: ''
              },
    });

    // state for determine if the fields were correctly filled
    const [inputStyles, setInputStyles] = useState({
        username: styles.input,
        email: styles.input,
        password: styles.input,
        passwordConfirmed: styles.input
    })


        // function for submitting data to the server;
    const onSubmit = async data => {
        if (schema.validate(data)) {
            const response = await fetch(`${API_URI}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                router.push('/dashboard');
                return;
            }
            const message = await response.json();
            console.log(message.error);
            setRedBorder();
        } else {
            setRedBorder();
        }
    };

    const setRedBorder = () => {
        const styling = styles.input + ' ' + styles.failed;
        setInputStyles({
            username: styling,
            email: styling,
            password: styling,
            passwordConfirmed: styling
        })
    }

    // changing submit button to be disabled or not depending on the input fields
    const handleChange = async e => {
        const field = e.target.name;
        const data = {};
        data[field] = e.target.value;
        if (field === 'passwordConfirmed') {
            const values = getValues();
            const styling = e.target.value === values.password ? styles.input + ' ' + styles.complete : styles.input + ' ' + styles.failed;
            setInputStyles({...inputStyles, passwordConfirmed: styling});
            return;
        }

        try {
            const validated = schema.validate(data);
            const newStyles = {};
            if (!validated) {
                newStyles[field] = styles.input;
            } else {
                newStyles[field] = styles.input + ' ' + styles.complete;
            }
            setInputStyles({
                ...inputStyles,
                ...newStyles
            });
        }
        catch (err) {
            return;
         }
    }
    
    return (
        <>
            <Head>
                <title>Sign Up | Application Tracker</title>
                <meta name="description" content="Application tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <main className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <span className="span">aT</span>
                    <h1>Sign Up</h1>
                    <label>
                        username:
                        <input
                            className={inputStyles.username} 
                            {...register('username', { required: true, onChange: (e) => handleChange(e)
                            })}
                        />
                    </label>
                    <label>
                        email:
                        <input
                            className={inputStyles.email} 
                            {...register('email', { required: true, onChange: (e) => handleChange(e)
                            })}
                        />
                    </label>
                    <label>
                        password:
                        <input {...register('password', 
                                { required: true, onChange: (e) => handleChange(e) })} 
                            type='password' 
                            className={inputStyles.password} 
                        />
                        <p className={styles.passwordText}>8+ characters: uppercase, lowercase, numbers</p>
                    </label>
                    <label>
                        confirm password:
                        <input {...register('passwordConfirmed', 
                                { required: true, onChange: (e) => handleChange(e) })} 
                            type='password' 
                            className={inputStyles.passwordConfirmed} 
                        />
                    </label>
                    <div className={styles.submitGroup}>
                        <input className={styles.submit} disabled={!formState.isValid} type='submit' value="SUBMIT" />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}