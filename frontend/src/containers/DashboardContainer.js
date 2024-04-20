import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import DashboardMain from "../components/Dashboard/DashboardMain";
import Applications from "./Applications";
import styles from "../styles/applications.module.css";

const DashboardContainer = observer(() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }

    const style = { height: "calc(100vh - 56px)" };
    return (
        <div style={style} className={`bg-[#F6F4F8] w-full`}>
            <Header handleLogout={handleLogout} />

            <main className="h-full">
                <Routes>
                    <Route path="/" element={<DashboardMain />} />
                    <Route path="/applications" element={<Applications />} />
                </Routes>
            </main>
        </div>
    )
});

export default DashboardContainer;