import styles from "../../../styles/applications.module.css";
import ChevronIcon from "../../../assets/openner.webp";
import { useState } from "react";

export const ApplicationRow = ({ app, color, setOpened, opened }) => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [showChevron, setShowChevron] = useState(false);
    const handleDropDown = () => {
        const callback = () => {
            setOpenDropDown(true);
            setOpened(app);
        }
        openDropDown ? setOpenDropDown(false) : callback();
    }

    if (!app) return;

    if (opened) return null;

    return (
        <>
            <div onMouseEnter={() => setShowChevron(true)}
                onMouseLeave={() => setShowChevron(false)}
                onClick={handleDropDown}
                style={{ background: color }} className="cursor-pointer w-full gap-[24px] h-[35px] flex justify-center items-center">
                <div className="w-[25%] pl-[25px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.company_name}</span>
                </div>
                <div className="w-[33%] pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.position}</span>
                </div>
                <div className="w-[16.5%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.phases[0]?.date}</span>
                </div>
                <div className="w-[25%] h-full flex justify-between items-center">
                    <span className={styles.tableText}>{app.phases[0]?.name}</span>
                    {showChevron && <img className={`h-[20px] mr-[4px] transition-transform cursor-pointer duration-300  ${openDropDown ? "rotate-180" : ""}`} src={ChevronIcon} />}
                </div>
            </div>
        </>
    )
}