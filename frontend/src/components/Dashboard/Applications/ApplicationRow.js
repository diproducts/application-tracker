import styles from "../../../styles/applications.module.css";
import ChevronIcon from "../../../assets/openner.webp";
import { useState } from "react";

export const ApplicationRow = ({ app, setOpened, opened }) => {
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
                className="cursor-pointer rounded-[10px] min-h-[65px] bg-[white] w-full gap-[24px] h-[35px] flex justify-center items-center">
                <div className="w-[36%] pl-[25px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.position}</span>
                </div>
                <div className="w-[18%] pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.company_name}</span>
                </div>
                <div className="w-[18%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.phases[0]?.date}</span>
                </div>
                <div className="w-[28%] h-full flex justify-between pr-[20px] items-center">
                    <span className={`${styles.tableText} capitalize`}>{app.phases[0]?.name}</span>
                    {showChevron && <img className={`h-[20px] mr-[4px] transition-transform cursor-pointer duration-300  ${openDropDown ? "rotate-180" : ""}`} src={ChevronIcon} />}
                </div>
            </div>
        </>
    )
}