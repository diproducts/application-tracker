import { useNavigate } from 'react-router-dom';
import styles from "../../styles/dashboard.module.css";
import { observer } from "mobx-react";
import applicationStore from "../../store/applicationStore";
import { useEffect, useState } from 'react';

const DashboardMain = observer(({ isLoading }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([{ num: 0, name: "Applications" },
    { num: 0, name: "Screening calls" },
    { num: 0, name: "Interviews" },
    { num: 0, name: "Final Interviews" },
    { num: 0, name: "Offers" }])

    useEffect(() => {
        if (isLoading) return;

        const new_data = data;
        new_data[0] = {
            num: applicationStore.applications?.length,
            name: "Applications"
        }
        setData(new_data)
    }, [isLoading, applicationStore.applications])

    const handleAppClick = () => {
        navigate("./applications");
    }

    return (
        <div className={styles.dashboardContainer}>
            {isLoading
                ? <div className="w-[60vw] flex justify-center items-center mt-[10vh]">
                    <div
                        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#666] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        ></span>
                    </div>
                </div>
                : <>            <div className="dash-col dash-col-left">
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
                    {/* <div className="events-container">
            <h2 className="title-events">Upcoming Events</h2>
            <div className="event">
                <p>Lead C++ at Rockstar</p>
                <p>Interview II on June, 6th <span className="soon-span">IN 2 DAYS</span></p>
            </div>
        </div> */}
                </div>
                    <div className=" dash-col dash-col-right">
                        <button onClick={handleAppClick} className="primary-button openings-button">
                            APPLICATIONS
                        </button>
                    </div></>}
        </div>
    )
})

export default DashboardMain;