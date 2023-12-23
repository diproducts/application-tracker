import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import DashboardMain from "../components/Dashboard/DashboardMain";
import Applications from "./Applications";
import styles from "../styles/dashboard.module.css";

const DashboardContainer = observer(() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }
    return (
        <div className={styles.dashContainer}>
            <Header handleLogout={handleLogout} />
            <main>
                <Routes>
                    <Route path="/" element={<DashboardMain />} />
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </main>
        </div>
    )
});

export default DashboardContainer;