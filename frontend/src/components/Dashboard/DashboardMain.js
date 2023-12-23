import { useNavigate } from 'react-router-dom';
import styles from "../../styles/dashboard.module.css";

const DashboardMain = () => {
    const navigate = useNavigate();
    const data = [
        { num: 17, name: "Applications" },
        { num: 6, name: "Screening calls" },
        { num: 5, name: "Interviews" },
        { num: 0, name: "Final Interviews" },
        { num: 0, name: "Offers" }];

    const handleAppClick = () => {
        navigate("./applications");
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className="dash-col dash-col-left">
                <h1 className="dash-title">My Progress</h1>
                <div className="stata-container">
                    {data.map((item, index) => {
                        return <div className={`li-stata ${item.num === 0 && "opaque"}`} key={index + Math.floor(Math.random())}>
                            <span style={{ fontWeight: "bold" }}>{item.num}</span>
                            <p style={{ display: "inline" }}>{item.name}</p>
                            {item.num === 0 && <span style={{ fontWeight: "bold" }}>(yet)</span>}
                        </div>
                    })}
                </div>
                <div className="events-container">
                    <h2 className="title-events">Upcoming Events</h2>
                    <div className="event">
                        <p>Lead C++ at Rockstar</p>
                        <p>Interview II on June, 6th <span className="soon-span">IN 2 DAYS</span></p>
                    </div>
                </div>
            </div>
            <div className=" dash-col dash-col-right">

                <button className="primary-button openings-button">SAVED OPENINGS</button>
                <button onClick={handleAppClick} className="primary-button applications-button">
                    APPLICATIONS
                </button>
            </div>
        </div>
    )
}
export default DashboardMain;