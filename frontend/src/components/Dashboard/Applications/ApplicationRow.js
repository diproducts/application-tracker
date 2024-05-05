import styles from "../../../styles/applications.module.css";
import { useModals } from "../../../context/ModalContext";

export const ApplicationRow = ({ app }) => {
    const { showModal } = useModals();
    const handleClick = () => {
        showModal("appInfo", { app })
    }

    if (!app) return;

    return (
        <>
            <div onClick={handleClick}
                className="cursor-pointer hover:shadow-tableRow rounded-[10px] min-h-[65px] bg-[white] w-full gap-[24px] h-[35px] flex justify-center items-center">
                <div className="w-[36%] relative whitespace-nowrap overflow-clip pl-[25px] h-full flex justify-start items-center">
                    <span className={`${styles.tableText}`}>{app.position}</span>

                    <span style={{ background: "linear-gradient(to right, rgba(255, 255, 255, 0.00) 0%, white 100%)" }}
                        className="absolute right-0 top-0 bottom-0 h-full w-[40px]"></span>
                </div>
                <div className="w-[18%] relative whitespace-nowrap overflow-clip pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.company_name}</span>

                    <span style={{ background: "linear-gradient(to right, rgba(255, 255, 255, 0.00) 0%, white 100%)" }}
                        className="absolute right-0 top-0 bottom-0 h-full w-[20px]"></span>
                </div>
                <div className="w-[18%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{app.phases[0]?.date}</span>
                </div>
                <div className="w-[28%] h-full flex justify-between pr-[20px] items-center">
                    <span className={`${styles.tableText} capitalize`}>{app.phases[0]?.name}</span>
                </div>
            </div>
        </>
    )
}