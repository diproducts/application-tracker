import atIcon from "../assets/aT.png";
import { useNavigate } from "react-router-dom";


const Header = ({ handleLogout }) => {
    const navigate = useNavigate();

    const handleAppClick = () => {
        navigate("./applications");
    }

    const goToMain = () => {
        navigate("./");
    }

    return (
        <header>
            <div style={{ display: "flex", gap: "44px" }}>
                <img onClick={goToMain} className="logo" src={atIcon} alt="logo" />
                <ul className="navbar-menu">
                    <li>My Openings</li>
                    <li>Resumes & CLs</li>
                    <li>Out Blog</li>
                    <li onClick={handleAppClick}>My Applications</li>
                </ul>
            </div>
            <div><p className="logout" onClick={handleLogout}>Logout</p></div>
        </header>
    )
}

export default Header;