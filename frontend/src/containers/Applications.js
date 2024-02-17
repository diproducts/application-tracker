import AddApplication from "../components/PopUps/AddApplication";
import { observer } from "mobx-react";
import applicationStore from "../store/applicationStore";
import { useState, useEffect } from "react";
import { EmptyState } from "../components/Dashboard/Applications/EmptyState";
import { AppTable } from "../components/Dashboard/Applications/AppTable";
import styles from "../styles/applications.module.css"

const Applications = observer(() => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [applications, setApplications] = useState(applicationStore.applications)

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    useEffect(() => {
        const getApps = async () => {
            await applicationStore.getApps();
            setTimeout(() => setIsLoading(false), 1000)
        }
        getApps()
    }, [])

    useEffect(() => {
        setApplications(applicationStore.applications)
    }, [applicationStore.applications])


    return (
        <div className={`w-fit mx-auto mt-[57px]`}>
            <div className="flex justify-between items-center">
                <span className="flex flex-col">
                    <h1 className={styles.applicationTitle}>My Applications</h1>
                    {applicationStore.applications?.length === 0 &&
                        <p className={`${styles.applicationSecondary}`}>Here you can keep applications you’ve applied for</p>}
                </span>
                <button onClick={handleAddClick} className="add-app-button">ADD AN APPLICATION</button>
            </div>
            {
                isLoading
                    ? <div className="w-[60vw] flex justify-center items-center mt-[10vh]">
                        <div
                            class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#666] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            ></span>
                        </div>
                    </div>
                    : applications?.length === 0
                        ? <EmptyState />
                        : <AppTable applications={applications} />
            }
            {showAddModal && <AddApplication setShowAddModal={setShowAddModal} />}
        </div >
    )
})

export default Applications;