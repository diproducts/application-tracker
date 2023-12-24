import styles from "../../styles/applications.module.css";
import OpennerIcon from "../../assets/openner.webp"
import { useState } from "react";

export const ApplicationRow = ({ app, index }) => {
    const [openDrop, setOpenDrop] = useState(false);

    return (
        <>
            <tr key={index + Math.floor(Math.random())}>
                <td>{app.company_name}</td>
                <td>{app.position}</td>
                <td>{app.phases[0].date}</td>
                <td>{app.phases[app.phases.length - 1].name}</td>
                <td className={styles.openner}>
                    <img
                        className={openDrop ? styles.rotate180 : ""}
                        src={OpennerIcon}
                        onClick={() => setOpenDrop((prev) => !prev)}
                        alt="arrow down" />
                </td>
            </tr>
            {/* {openDrop &&
                <tr className={styles.info}>
                    hello
                </tr>} */}
        </>
    )
}