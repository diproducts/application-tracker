import { Routes, Route } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import PasswordReset from "./PasswordReset";
import { useState } from "react";

const Auth = () => {
    const [mode, setMode] = useState({
        login: false,
        signup: true,
        reset: false
    })

    const toggle = () => {
        const newMode = {
            login: !mode.login,
            signup: !mode.signup,
            reset: false
        }

        setMode(newMode);
    }

    const reset = () => {
        const newMode = {
            login: false,
            signup: false,
            reset: true
        }

        setMode(newMode)
    }


    return (
        <Routes>
            <Route path="/" element={<AuthContainer
                reset={reset}
                toggle={toggle}
                setMode={setMode}
                mode={mode} />} />
            <Route path="/password/reset/confirm/:userId/:token"
                element={<PasswordReset setMode={setMode} />} />
        </Routes>

    )
};

export default Auth;