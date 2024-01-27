import { useForm } from "react-hook-form";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const SignUp = observer(() => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!schema.validate(data)) return;
        setIsLoading(true)
        try {
            const response = await userStore.registerUser(data);
            if (!response) {
                toast.error("This email is already taken!")
                setIsLoading(false)
            }
            else {
                userStore.setLogged(true);
                navigate("/dashboard")
                setIsLoading(false)
            }
        } catch (err) {
            toast.error("This email is already taken!")
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        const fields = getValues();

        const email = fields.email;
        const password = fields.password;
        const passwordConfirmed = fields.confirm;
        const name = fields.name;


        if (!schema.validate({ email })) {
            toast.error("Please provide a valid email!")
        }

        if (!schema.validate({ password })) {
            toast.error("Please provide a valid password!")
        }

        if (passwordConfirmed !== password) {
            toast.error("Paswords don't match!")
        }

        if (!schema.validate({ name })) {
            toast.error("Please provide a valid username!");
        }
    }

    return (
        <div className=" w-full">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light" />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formWrapper}>
                    <label htmlFor='name'>username: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("name", { required: false })} type='text' name='name' />
                    </div>
                    <label htmlFor='email'>email: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("email", { required: true })} type='text' name='email' />
                    </div>
                    <label htmlFor='password'>password: </label>
                    <div style={{ position: "relative" }}>
                        <input {...register("password", { required: true })} type='password' name='password' />
                    </div>
                    <label htmlFor='confirm'>confirm password:</label>
                    <div style={{ position: "relative" }}>
                        <input {...register("confirm", { required: true })} type='password' name='confirm' />
                    </div>
                    <button
                        onClick={handleClick}
                        className={`${styles.bt} 
                      cursor-pointer bg-[#6BA6FF] uppercase  w-[62.33%] self-center`}
                    >
                        {isLoading ? <div className=" flex items-center justify-center space-x-2 animate-pulse">
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                        </div> : 'submit'}</button>
                </div>
            </form>
        </div>
    )
});

export default SignUp;