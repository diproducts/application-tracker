import styles from "../../styles/errors.module.css";
import { useEffect, useState } from "react";

export const ErrorCard = ({ errorMessage }) => {
    const [toFade, setToFade] = useState(false);

    useEffect(() => {
        setTimeout(() => setToFade(true), 3500)
    }, [])

    const Background = () =>
        <svg className={styles.background} xmlns="http://www.w3.org/2000/svg" width="350" height="52" viewBox="0 0 350 52" fill="none">
            <path d="M15.5063 0H350L333.386 27.4648L350 52H15.5063L0 26L15.5063 0Z" fill="#FFAAAA" fill-opacity="0.66" />
        </svg>
    return (
        <div className={`${styles.errorCard} ${styles.fadeIn} 
        ${toFade ? styles.fadeOut : ""}`}>
            <Background />
            <p className={styles.text}>{errorMessage}</p>
        </div>
    )
}