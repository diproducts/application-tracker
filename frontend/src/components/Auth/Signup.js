import { useForm } from "react-hook-form";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { ErrorCard } from "../Errors/ErrorCard";
import { useState } from "react";

const SignUp = observer(({ toggle }) => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const [isPassError, setIsPassError] = useState(false);
    const [isCopyPassError, setIsCopyPassError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isUserError, setIsUserError] = useState(false);

    const [emailMessage, setEmailMessage] = useState();

    const onSubmit = async (data) => {
        if (!schema.validate(data)) return;
        const response = await userStore.registerUser(data);
        if (!response) {
            setEmailMessage("This email is already taken")
            setIsEmailError(true);
            setTimeout(() => setIsEmailError(false), 4000)
        }
        else {
            userStore.setLogged(true);
            navigate("/dashboard")
        }
    }

    const handleClick = () => {
        const fields = getValues();

        const email = fields.email;
        const password = fields.password;
        const passwordConfirmed = fields.confirm;
        const name = fields.name;


        if (!schema.validate({ email })) {
            setEmailMessage("please provide a valid email")
            setIsEmailError(true);
            setTimeout(() => setIsEmailError(false), 4000)
        }

        if (!schema.validate({ password })) {
            setIsPassError(true);
            setTimeout(() => setIsPassError(false), 4000)
        }

        if (passwordConfirmed !== password) {
            setIsCopyPassError(true);
            setTimeout(() => setIsCopyPassError(false), 4000)
        }

        if (!schema.validate({ name })) {
            setIsUserError(true);
            setTimeout(() => setIsUserError(false), 4000)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Sign up</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formWrapper}>
                    <label htmlFor='name'>username: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("name", { required: false })} type='text' name='name' />
                        {isUserError && <ErrorCard errorMessage={"please provide a valid username"} />}
                    </div>
                    <label htmlFor='email'>email: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("email", { required: true })} type='text' name='email' />
                        {isEmailError && <ErrorCard errorMessage={emailMessage} />}
                    </div>
                    <label htmlFor='password'>password: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("password", { required: true })} type='password' name='password' />
                        {isPassError && <ErrorCard errorMessage={"please provide a valid password"} />}
                    </div>
                    <label htmlFor='confirm'>confirm password:</label>
                    <div style={{ position: "relative" }}>
                        <input {...register("confirm", { required: true })} type='password' name='confirm' />
                        {isCopyPassError && <ErrorCard errorMessage={"Paswords don't match"} />}
                    </div>
                    <input onClick={handleClick} type="submit" className={styles.bt} value='SUBMIT' />
                </div>
            </form>
            <div className={styles.butttons}>
                <button className={styles.bt} onClick={toggle}>LOG IN</button>
            </div>
        </div>
    )
});

export default SignUp;