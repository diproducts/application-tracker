import styles from "../../../styles/applications.module.css"

export const ApplicationRow = ({ app, color }) => {
    return (
        <div style={{ background: color }} className="w-full gap-[24px] h-[35px] flex justify-center items-center">
            <div className="w-[25%] pl-[25px] h-full flex justify-start items-center">
                <span className={styles.tableText}>{app.company_name}</span>
            </div>
            <div className="w-[33%] pl-[5px] h-full flex justify-start items-center">
                <span className={styles.tableText}>{app.position}</span>
            </div>
            <div className="w-[16.5%] pl-[15px] h-full flex justify-start items-center">
                <span className={styles.tableText}>{app.phases[0]?.date}</span>
            </div>
            <div className="w-[25%] h-full flex justify-start items-center">
                <span className={styles.tableText}>{app.phases[0]?.name}</span>
            </div>
        </div>
    )
}