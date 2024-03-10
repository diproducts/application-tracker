import styles from "../../../styles/applications.module.css";
import ChevronIcon from "../../../assets/openner.webp";

export const ApplicationDropDown = ({ opened, setOpened }) => {

    const handleDropDown = () => {
        setOpened(null);
    }

    return (
        <div className={`bg-[#F0F0F0] w-full h-full `}>
            <div className=" w-full gap-[24px] h-[35px] flex justify-center items-center">
                <div className="w-[25%] pl-[25px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{opened.company_name}</span>
                </div>
                <div className="w-[33%] pl-[5px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{opened.position}</span>
                </div>
                <div className="w-[16.5%] pl-[15px] h-full flex justify-start items-center">
                    <span className={styles.tableText}>{opened.phases[0]?.date}</span>
                </div>
                <div className="w-[25%] h-full flex justify-between items-center">
                    <span className={styles.tableText}>{opened.phases[0]?.name}</span>
                    <img onClick={handleDropDown} className={`cursor-pointer h-[20px] mr-[4px] rotate-180`} src={ChevronIcon} />
                </div>
            </div>
            <div className=" pl-[25px] mt-[27px]">
                <p style={{ color: "#4947A0" }} className={`${styles.tableText}`}>{opened.url}</p>
            </div>
        </div>
    )
}