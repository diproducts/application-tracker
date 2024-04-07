import Logo from "../assets/aT.png";
import styles from "../styles/auth.module.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import schema from "../helpers/validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from "mobx-react";
import userStore from "../store/userStore";

const PasswordReset = observer(({ setMode }) => {
    const { register, handleSubmit, getValues } = useForm();
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [notValid, setNotValid] = useState(true);
    const [passwordSent, setPasswordSent] = useState(false);

    const onSubmit = async (data) => {
        if (notValid) return;

        setIsLoading(true);
        const response = await userStore.newPassword({
            new_password1: data.password,
            new_password2: data.confirm,
            uid: userId,
            token: token
        });
        if (response) {
            setPasswordSent(true);
        } else {
            toast.error("Something went wrong! Please try again")
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        const password = getValues().password;
        const confirm = getValues().confirm;

        if (!schema.validate({ password }, 'password')) {
            setNotValid(true)
            toast.error("Please provide a valid password!")
        }

        if (confirm !== password) {
            setNotValid(true)
            toast.error("Passwords don't match!")
        }

        setNotValid(false);
    }

    const handleGoBack = () => {
        const newMode = {
            login: true,
            signup: false,
            reset: false
        }

        setMode(newMode);
        navigate("/auth")
    }

    return (
        <main className="flex justify-center relative bg-violet select-none flex-col md:flex-row h-full w-full overflow-scroll hidden-scroll">
            <img className="absolute w-[28px] top-[10px] left-[20px]" src={Logo} alt="logo" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light" />

            {passwordSent
                ? <div className="w-full bg-[#FEFEFE] h-[260px] mt-[85px] pl-[15%] pt-[42px]">
                    <p className={`cursor-pointer text-[#7066E4] p-0 m-0 ${styles.title} text-[24px]`} >Great news,</p>
                    <p className="work-sans text-[20px] text-[#434343] pt-[25px]">Your password has been reset.</p>
                    {/* <p className="work-sans text-[20px] text-[#434343] pt-[8px]">Please check your email for instructions.</p> */}

                    <p onClick={handleGoBack} className={`pt-[57px] ${styles.greyTextSmall}`}>Go to log in page</p>
                </div>
                : <div className="h-full w-[450px] bg-[#FEFEFE] pt-[92px] flex flex-col justify-start items-start pl-[79px]">
                    <p className={`cursor-pointer text-[#7066E4] p-0 m-0 ${styles.title} text-[28px]`} >Choose new password</p>
                    <p className="inter-text text-[#434343] pt-[10px]">Please use 8+ characters</p>

                    <div className="mt-[40px] w-full pr-[79px]">
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formWrapper}>
                                <label htmlFor='password'>password: </label>
                                <div style={{ position: "relative" }}>
                                    <input
                                        className="mb-[25px]"
                                        {...register("password", { required: true })}
                                        type='password'
                                        name='password' />
                                </div>

                                <label htmlFor='confirm'>repeat password:</label>
                                <div style={{ position: "relative" }}>
                                    <input {...register("confirm", { required: true })} type='password' name='confirm' />
                                </div>


                                <button
                                    onClick={handleClick}
                                    className={`${styles.bt} 
                                mt-[50px]
                      cursor-pointer bg-[#6BA6FF] uppercase w-[182px] self-center`}
                                >
                                    {isLoading ? <div className=" flex items-center justify-center space-x-2 animate-pulse">
                                        <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                                        <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                                        <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                                    </div> : 'submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>}
        </main>
    )
})

export default PasswordReset;