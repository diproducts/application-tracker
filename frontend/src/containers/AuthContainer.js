import { useState } from "react";
import LogIn from '../components/Auth/Login';
import SignUp from '../components/Auth/Signup';
import '../static/Auth.css';

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
        <main>
            {mode.login ? <LogIn toggle={toggle} /> : <SignUp toggle={toggle} />}
            <footer></footer>
        </main>
    )
}