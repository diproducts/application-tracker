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
        <main className="flex h-screen w-screen">
            <div className="bg-main flex-1 p-[50px] pt-[90px] text-left">
                <h1 className={`${styles.mainTitle} m-0`}>Application</h1>
                <h1 className={`${styles.mainTitle} m-0`}>Manager</h1>

                <p className={`${styles.secondaryTitle} mt-[30px]`}>A journey to success is easier when you got <br />
                    the right tools. The first step is an outstanding resume. <br />
                    Let us help you with that. You can do the rest.</p>
            </div>
            <div className="w-[36.72vw] flex justify-center items-center">
                {mode.login ? <LogIn toggle={toggle} /> : <SignUp toggle={toggle} />}
            </div>
        </main>
    )
}