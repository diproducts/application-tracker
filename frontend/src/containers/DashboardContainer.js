import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import DashboardMain from "../components/Dashboard/DashboardMain";

const Test = () => {
    return (
        <div>test</div>
    )
}

const DashboardContainer = observer(() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }
    return (
        <>
            <Header handleLogout={handleLogout} />
            <main className="main-dashboard">
                <Routes>
                    <Route path="/" element={<DashboardMain />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </main>
        </>
    )
});

export default DashboardContainer;