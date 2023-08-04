import atIcon from "../assets/aT.png";

const Header = ({ handleLogout }) => {

    return (
        <header>
            <div style={{ display: "flex", gap: "44px" }}>
                <img className="logo" src={atIcon} alt="logo" />
                <ul className="navbar-menu">
                    <li><a>My Openings</a></li>
                    <li><a>Resumes & CLs</a></li>
                    <li><a>Out Blog</a></li>
                    <li><a>My Applications</a></li>
                </ul>
            </div>
            <div><p className="logout" onClick={handleLogout}>Logout</p></div>
        </header>
    )
}

export default Header;