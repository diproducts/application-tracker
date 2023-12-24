import { useForm } from "react-hook-form";
import { useState } from "react";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { ErrorCard } from "../Errors/ErrorCard";

const LogIn = observer(({ toggle }) => {
    const [isPassError, setIsPassError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (!schema.validate(data, 'login')) return;
        const response = await userStore.loginUser(data);
        if (!response) {
            setIsPassError(true);
            setTimeout(() => setIsPassError(false), 4000)
        }
        else {
            userStore.setLogged(true);
            navigate("/dashboard")
        }
    }

    const handleClick = () => {
        const email = getValues().email;
        const password = getValues().password;

        if (!schema.validate({ email }, 'login')) {
            setIsEmailError(true);
            setTimeout(() => setIsEmailError(false), 4000)
        }

        if (!schema.validate({ password }, 'password')) {
            setIsPassError(true);
            setTimeout(() => setIsPassError(false), 4000)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Log in</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formWrapper}>
                    <label htmlFor='email'>email: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("email", { required: true })} type='text' name='email' />
                        {isEmailError && <ErrorCard errorMessage={"please provide a valid email"} />}
                    </div>
                    <label htmlFor='password'>password: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("password", { required: true })} type='password' name='password' />
                        {isPassError && <ErrorCard errorMessage={"please provide a valid password"} />}
                    </div>
                    <input onClick={handleClick} type="submit" className={styles.bt} value='SUBMIT' />
                </div>
            </form>
            <div className={styles.buttons}>
                <button className={styles.bt} onClick={toggle}>SIGN UP</button>
            </div>
        </div>
    )
});
export default LogIn;