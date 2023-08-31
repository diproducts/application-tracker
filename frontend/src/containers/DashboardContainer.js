import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import DashboardMain from "../components/Dashboard/DashboardMain";
import Applications from "./Applications";

const DashboardContainer = observer(() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Header handleLogout={handleLogout} />
            <main className="main-dashboard">
                <Routes>
                    <Route path="/" element={<DashboardMain />} />
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </main>
        </div>
    )
});

export default DashboardContainer;