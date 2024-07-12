import atIcon from "../assets/aT.png";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/dashboard.module.css";
import { useState, useEffect } from "react";

const Header = ({ handleLogout }) => {
    const location = useLocation();
    const [states, setStates] = useState({
        apps: {
            active: location.pathname.includes("/applications"),
            hovered: false
        },
        dashboard: {
            active: location.pathname === "/dashboard/" || location.pathname === "/dashboard"
        },
        log_hovered: false,
        acc: {
            active: location.pathname.includes("/account"),
            hovered: false
        },
    });

    useEffect(() => {
        const new_states = {
            ...states,
            apps: { ...states.apps, active: false },
            dashboard: {
                ...states.dashboard, active: false
            },
            acc: { ...states.acc, active: false }
        }

        if (location.pathname.includes("/applications")) {
            setStates({ ...new_states, apps: { ...new_states.apps, active: true } });
            return;
        }

        if (location.pathname === "/dashboard/" || location.pathname === "/dashboard") {
            setStates({ ...new_states, dashboard: { ...new_states.dashboard, active: true } });
            return;
        }

        if (location.pathname.includes("/account")) {
            setStates({ ...new_states, acc: { ...new_states.acc, active: true } });
            return;
        }

        setStates({ ...new_states });
    }, [location.pathname])


    const navigate = useNavigate();

    const handleAppClick = () => {
        navigate("./applications");
    }

    const goToMain = () => {
        navigate("./");
    }

    const handleAccount = () => {
        navigate("./account")
    }

    return (
        <header>
            <div className="flex gap-[44px] h-full items-center">
                <img onClick={goToMain} className="logo" src={atIcon} alt="logo" />
                <ul className={`${styles.navbarMenu} h-full`}>
                    <li onMouseEnter={() => setStates({ ...states, dashboard: { ...states.dashboard, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, dashboard: { ...states.dashboard, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.dashboard.active ? "text-[black]" : "text-[#595959]"}`} onClick={goToMain}>
                        Dashboard
                        {(states.dashboard.hovered || states.dashboard.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>
                    <li onMouseEnter={() => setStates({ ...states, apps: { ...states.apps, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, apps: { ...states.apps, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.apps.active ? "text-[black]" : "text-[#595959]"}`} onClick={handleAppClick}>
                        Applications
                        {(states.apps.hovered || states.apps.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>
                </ul>
            </div>
            <div className="flex gap-[35px]">
                <div className="h-full py-[20px] relative">
                    <p onMouseEnter={() => setStates({ ...states, acc: { ...states.acc, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, acc: { ...states.acc, hovered: false } })}
                        className={styles.logout} onClick={handleAccount}>Account
                    </p>
                    {(states.acc.hovered || states.acc.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                </div>
                <div className="h-full py-[20px] relative">
                    <p onMouseEnter={() => setStates({ ...states, log_hovered: true })}
                        onMouseLeave={() => setStates({ ...states, log_hovered: false })}
                        className={styles.logout} onClick={handleLogout}>Logout
                    </p>
                    {states.log_hovered && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                </div>
            </div>
        </header>
    )
}

export default Header;