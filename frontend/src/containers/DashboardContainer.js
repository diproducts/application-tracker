import { observer } from "mobx-react";
import userStore from "../store/userStore";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import DashboardMain from "../components/Dashboard/DashboardMain";
import Applications from "./Applications";
import Account from "./Account";
import { useState, useEffect } from "react";
import applicationStore from "../store/applicationStore";

const DashboardContainer = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        userStore.logoutUser();
        userStore.setLogged(false);
        navigate("/auth")
    }

    useEffect(() => {
        const getApps = async () => {
            await applicationStore.getApps();
            setTimeout(() => setIsLoading(false), 1000)
        }
        getApps()
    }, [isLoading])

    const style = { height: "calc(100vh - 56px)" };
    return (
        <div style={style} className={`bg-[#F6F4F8] w-full`}>
            <Header handleLogout={handleLogout} />

            <main className="h-full">
                <Routes>
                    <Route path="/" element={<DashboardMain isLoading={isLoading} />} />
                    <Route path="/applications" element={<Applications isLoading={isLoading}
                        setIsLoading={setIsLoading} />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </main>
        </div>
    )
});

export default DashboardContainer;