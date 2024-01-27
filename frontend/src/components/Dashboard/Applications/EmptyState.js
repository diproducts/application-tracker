import styles from "../../../styles/applications.module.css"

export const EmptyState = () => {

    return (
        <div className={`w-[60vw] mt-[97px] ${styles.emptyState}`}>
            <p>Welcome to Applications! Once you’ve applied for a job, you can save the resume and cover letter you used and any other details to track your progress.</p>
            <p>To create an application record, just click “Add an Application”. Good luck!</p>
        </div>
    )
}