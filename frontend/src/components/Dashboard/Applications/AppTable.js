import styles from "../../../styles/applications.module.css"
import { observer } from "mobx-react";
import applicationStore from "../../../store/applicationStore";
import { ApplicationRow } from "./ApplicationRow";

export const AppTable = observer(({ }) => {

    return (
        <div className="w-[72vw] pt-[50px]">
            <div className="w-full bg-[white] gap-[24px] h-[35px] flex justify-center items-center">
                <div className="w-[25%] pl-[25px] h-full flex justify-start items-center">
                    <span className={styles.header}>Company</span>
                </div>
                <div className="w-[33%] pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.header}>Role</span>
                </div>
                <div className="w-[16.5%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.header}>Applied date</span>
                </div>
                <div className="w-[25%] h-full flex justify-start items-center">
                    <span className={styles.header}>Status</span>
                </div>
            </div>

            {applicationStore.applications?.map((app, index) =>
                <ApplicationRow
                    color={index == 0 || index % 2 === 0 ? "#C2D0FF" : "#E0EBFF"}
                    key={app.id + Math.random()}
                    app={app} />)}
        </div>
    )
})