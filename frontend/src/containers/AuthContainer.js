import { useState } from "react";
import LogIn from '../components/Auth/Login';
import SignUp from '../components/Auth/Signup';
import styles from "../styles/auth.module.css";

export default function AuthContainer() {
    const [mode, setMode] = useState({
        login: false,
        signup: true
    })

    const toggle = () => {
        const newMode = {
            login: !mode.login,
            signup: !mode.signup
        }

        setMode(newMode);
    }

    return (
        <main className="flex select-none flex-col md:flex-row h-full w-full overflow-scroll hidden-scroll">
            <div className="bg-main flex-1 pt-[90px] pl-[7.73vw] text-left">
                <h1 className={`${styles.mainTitle} m-0`}>Application</h1>
                <h1 className={`${styles.mainTitle} m-0`}>Manager</h1>

                <p className={`${styles.secondaryTitle} mt-[30px]`}>A journey to success is easier when you got <br />
                    the right tools. The first step is an outstanding resume. <br />
                    Let us help you with that. You can do the rest.</p>
            </div>
            <div className="w-[36.72vw] pl-[6.1vw] flex flex-col justify-start pt-[120px] items-start">
                <div className="w-[62.13%]">
                    <div className="flex w-full gap-[15px] mb-[45px]">
                        <p onClick={toggle} className={`cursor-pointer text-[#7066E4] ${mode.login ? styles.selected : "opacity-50"} ${styles.title}`}>Log In</p>
                        <div className="h-[34px] bg-[#7066E4] w-[1px]"></div>
                        <p onClick={toggle} className={`${styles.title} cursor-pointer text-[#7066E4] ${mode.login ? "opacity-50" : styles.selected}`}>Sign Up</p>
                    </div>
                    {mode.login ? <LogIn toggle={toggle} /> : <SignUp toggle={toggle} />}
                </div>
            </div>
        </main>
    )
}