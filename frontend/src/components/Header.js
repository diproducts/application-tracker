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
        ops: {
            active: location.pathname.includes("/opennings"),
            hovered: false
        },
        res: {
            active: location.pathname.includes("/resumes"),
            hovered: false
        },
        blog: {
            active: location.pathname.includes("/blog"),
            hovered: false
        },
        log_hovered: false
    });

    useEffect(() => {
        const new_states = {
            ...states, apps: { ...states.apps, active: false },
            ops: { ...states.ops, active: false }, res: { ...states.res, active: false },
            blog: { ...states.blog, active: false }
        }

        if (location.pathname.includes("/applications")) {
            setStates({ ...new_states, apps: { ...new_states.apps, active: true } });
            return;
        }
        if (location.pathname.includes("/opennings")) {
            setStates({ ...new_states, ops: { ...new_states.ops, active: true } });
            return;
        }
        if (location.pathname.includes("/resumes")) {
            setStates({ ...new_states, res: { ...new_states.res, active: true } });
            return;
        }
        if (location.pathname.includes("/blog")) {
            setStates({ ...new_states, blog: { ...new_states.blog, active: true } });
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

    return (
        <header>
            <div className="flex gap-[44px] h-full items-center">
                <img onClick={goToMain} className="logo" src={atIcon} alt="logo" />
                <ul className={`${styles.navbarMenu} h-full`}>
                    <li onMouseEnter={() => setStates({ ...states, ops: { ...states.ops, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, ops: { ...states.ops, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.ops.active ? "text-[black]" : "text-[#595959]"}`} >
                        My Openings
                        {(states.ops.hovered || states.ops.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>

                    <li onMouseEnter={() => setStates({ ...states, res: { ...states.res, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, res: { ...states.res, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.res.active ? "text-[black]" : "text-[#595959]"}`}>
                        Resumes & CLs
                        {(states.res.hovered || states.res.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>
                    <li onMouseEnter={() => setStates({ ...states, blog: { ...states.blog, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, blog: { ...states.blog, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.blog.active ? "text-[black]" : "text-[#595959]"}`}>
                        Out Blog
                        {(states.blog.hovered || states.blog.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>
                    <li onMouseEnter={() => setStates({ ...states, apps: { ...states.apps, hovered: true } })}
                        onMouseLeave={() => setStates({ ...states, apps: { ...states.apps, hovered: false } })}
                        className={`relative h-full py-[20px] ${states.apps.active ? "text-[black]" : "text-[#595959]"}`} onClick={handleAppClick}>
                        My Applications
                        {(states.apps.hovered || states.apps.active) && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
                    </li>
                </ul>
            </div>
            <div className="h-full py-[20px] relative">
                <p onMouseEnter={() => setStates({ ...states, log_hovered: true })}
                    onMouseLeave={() => setStates({ ...states, log_hovered: false })}
                    className={styles.logout} onClick={handleLogout}>Logout
                </p>
                {states.log_hovered && <div className="absolute bottom-0 h-[3px] w-full bg-[black]"></div>}
            </div>
        </header>
    )
}

export default Header;