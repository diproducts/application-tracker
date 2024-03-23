import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = observer(({ reset }) => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!schema.validate(data, 'login')) return;

        setIsLoading(true)
        try {
            const response = await userStore.loginUser(data);
            if (!response) {
                toast.error("Please provide valid credentials!")
                setIsLoading(false)
            }
            else {
                userStore.setLogged(true);
                navigate("/dashboard")
                setIsLoading(false)
            }
        } catch (err) {
            toast.error("Please provide valid credentials!")
        }
        setIsLoading(false)

    }

    const handleClick = () => {
        const email = getValues().email;
        const password = getValues().password;

        if (!schema.validate({ email }, 'login')) {
            toast.error("Please provide a valid email!")
        }

        if (!schema.validate({ password }, 'password')) {
            toast.error("Please provide a valid password!")
        }
    }

    return (
        <div className="w-full">
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
                    <label htmlFor='email'>email: </label>
                    <div style={{ position: "relative" }}>
                        <input
                            {...register("email", { required: true })}
                            type='text'
                            name='email' />
                    </div>
                    <label htmlFor='password'>password: </label>
                    <div style={{ position: "relative" }}>
                        <input
                            {...register("password", { required: true })}
                            type='password'
                            name='password' />
                    </div>
                    <button
                        onClick={handleClick}
                        className={`${styles.bt} 
                      cursor-pointer bg-[#6BA6FF] uppercase w-[62.33%] self-center`}
                    >
                        {isLoading ? <div className=" flex items-center justify-center space-x-2 animate-pulse">
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                        </div> : 'log in'}</button>

                    <div className="w-full flex justify-center items-center mt-[20px]">
                        <p onClick={reset} className={styles.greyText}>Forgot password?</p>
                    </div>
                </div>
            </form>
        </div>
    )
});
export default LogIn;