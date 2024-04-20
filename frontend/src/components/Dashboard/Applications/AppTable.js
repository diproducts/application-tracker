import styles from "../../../styles/applications.module.css"
import { observer } from "mobx-react";
import { ApplicationRow } from "./ApplicationRow";
import { useEffect, useState } from "react";
import { ApplicationDropDown } from "./ApplicationDropDown";

export const AppTable = observer(({ applied, notApplied, applications }) => {
    const [opened, setOpened] = useState(null);
    const [active, setActive] = useState("all");
    const [localApps, setLocalApps] = useState(applications);

    useEffect(() => {
        switch (active) {
            case "all":
                setLocalApps(applications);
                break;
            case "applied":
                setLocalApps(applied);
                break;
            case "not":
                setLocalApps(notApplied);
                break;
        }
    }, [active])

    return (
        <div className={`w-[72vw] pt-[30px] pb-[50px] flex flex-col h-full`}>
            <div className="w-full mb-[20px] h-fit justify-end flex items-center">
                <button onClick={() => setActive("all")}
                    className={`${styles.leftBtn} w-[55px] flex justify-center items-center hover:bg-[#C8AEFF] 
                    ${active === "all" ? "bg-[#C8AEFF]" : "bg-[#FEFEFE]"}`}>All</button>
                <button onClick={() => setActive("applied")}
                    className={`${styles.midBtn} w-[117px] flex justify-center items-center hover:bg-[#C8AEFF]
                    ${active === "applied" ? "bg-[#C8AEFF]" : "bg-[#FEFEFE]"}`}>Applied</button>
                <button onClick={() => setActive("not")}
                    className={`${styles.rightBtn} w-[117px] flex justify-center items-center hover:bg-[#C8AEFF] 
                    ${active === "not" ? "bg-[#C8AEFF]" : "bg-[#FEFEFE]"}`}>Not Applied</button>
            </div>
            <div className="gap-[24px] flex justify-center items-center">
                <div className="w-[36%] h-[60px] pl-[25px] h-full flex justify-start items-center">
                    <span className={styles.header}>Role</span>
                </div>
                <div className="w-[18%] pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.header}>Company</span>
                </div>
                <div className="w-[18%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.header}>Applied date</span>
                </div>
                <div className="w-[28%] h-full flex justify-start items-center">
                    <span className={styles.header}>Status</span>
                </div>
            </div>
            <div className="overflow-scroll h-full
            hidden-scroll pb-[100px] flex flex-col gap-[20px]">
                {opened && <ApplicationDropDown opened={opened} setOpened={setOpened} />}
                {localApps?.map((app, index) =>
                    <ApplicationRow
                        opened={opened}
                        setOpened={setOpened}
                        key={app.id + Math.random()}
                        app={app} />)}

            </div>
            <div className={styles.shadow}></div>
        </div >
    )
})