import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/footer';
import styles from '@/styles/Login.module.css';
import schema from '../helper/validator';

export default function Login() {
    const router = useRouter();
    const { register, formState, handleSubmit } = useForm(
        {
        mode: 'onSubmit',
        defaultValues: {
                email: '',
                password: '',
                remember: false
              },
    });

    // state for determine if the fields were correctly filled
    const [emailClasses, setEmailClasses] = useState(styles.input);
    const [passwordClasses, setPasswordClasses] = useState(styles.input);

    // function for submitting data to the server;
    const onSubmit = async data => {
        if (schema.validate(data, "login")) {
            const response = await fetch(`api/login`, {
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
            setRedBorder();
        } else {
            setRedBorder();
        }
    };

    const setRedBorder = () => {
        setEmailClasses(styles.input + ' ' + styles.failed);
        setPasswordClasses(styles.input + ' ' + styles.failed);
    }

    // changing submit button to be disabled or not depending on the input fields
    const handleChange = async e => {
        const field = e.target.name;
        const data = {};
        data[field] = e.target.value;
        try {
            const validated = schema.validate(data, "login");
            if (!validated) {
                field === 'email' ? setEmailClasses(styles.input) : setPasswordClasses(styles.input);
            } else {
                field === 'email' ? setEmailClasses(styles.input + ' ' + styles.complete) : setPasswordClasses(styles.input + ' ' + styles.complete);
            }
            return;
        }
        catch (err) {
            return;
         }
    }

    return (
        <>
            <Head>
                <title>Log In | Application Tracker</title>
                <meta name="description" content="Application tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <main className={styles.container}>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <span className="span">aT</span>
                    <h1>Log in</h1>
                    <label className={styles.label}>
                        email:
                        <input
                            className={emailClasses} 
                            {...register('email', { required: true, onChange: (e) => handleChange(e)
                            })}
                        />
                    </label>
                    <label className={styles.label}>
                        password:
                        <input {...register('password', 
                                { required: true, onChange: (e) => handleChange(e) })} 
                            type='password' 
                            className={passwordClasses} 
                        />
                    </label>
                    <div className={styles.rememberGroup}>
                        <input {...register('remember')} name='remember' type='checkbox' />
                        <label htmlFor='remember'>remember me</label>
                    </div>
                    <div className={styles.submitGroup}>
                        <input className={styles.submit} disabled={!formState.isValid} type='submit' value="LOG IN" />
                        <p>Forgot password?</p>
                    </div>
                </form>

                <Footer />
            </main>
        </>
    )
}