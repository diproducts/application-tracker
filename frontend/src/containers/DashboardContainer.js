import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const DashboardContainer = observer(() => {
    const navigate = useNavigate();

    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }

    return (
        <main>
            <button onClick={handleLogout}>Let me out</button>
        </main>
    )
});

export default DashboardContainer;