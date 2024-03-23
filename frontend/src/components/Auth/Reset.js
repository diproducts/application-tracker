import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import schema from "../../helpers/validator";
import { observer } from "mobx-react";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = observer(({ setMode }) => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const onSubmit = async (data) => {
        if (!schema.validate(data, 'login')) return;

        setIsLoading(true)
        try {
            const response = await userStore.resetUser(data);
            if (!response) {
                toast.error("Please provide valid credentials!")
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
                setEmailSent(true)
            }
        } catch (err) {
            toast.error("Please provide valid credentials!")
        }
        setIsLoading(false)

    }

    const goToMain = () => {
        const newMode = {
            login: true,
            signup: false,
            reset: false
        }

        setMode(newMode)
    }

    const handleClick = () => {
        const email = getValues().email;

        if (!schema.validate({ email }, 'login')) {
            toast.error("Please provide a valid email!")
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
            {emailSent
                ? <div>
                    <p className={`${styles.addText} mt-[20px] mb-[8px]`}>Your password has been reset.</p>
                    <p className={`${styles.addText}`}>Please check your email for instructions.</p>

                    <p onClick={goToMain} className={`${styles.greyTextSmall} mt-[20px]`}>Go to sign in page</p>
                </div>
                : <><p className={`${styles.addText} mt-[20px] mb-[35px]`}>Please type your email below and we’ll send you a password reset link shortly</p>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formWrapper}>
                            <label htmlFor='email'>email: </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    {...register("email", { required: true })}
                                    type='text'
                                    name='email' />
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
                                </div> : 'submit'}</button>
                        </div>
                    </form>
                </>}
        </div>
    )
});
export default Reset;