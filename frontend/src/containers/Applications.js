import AddApplication from "../components/PopUps/AddApplication";
import { observer } from "mobx-react";
import applicationStore from "../store/applicationStore";
import { useState, useEffect } from "react";
import { ApplicationRow } from "../components/Dashboard/ApplicationRow";
import { EmptyState } from "../components/Dashboard/Applications/EmptyState";
import styles from "../styles/applications.module.css"

const Applications = observer(() => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    useEffect(() => {
        applicationStore.getApps();
    }, [])


    return (
        <div className="w-fit mx-auto mt-[57px]">
            <div className="flex justify-between items-center">
                <span className="flex flex-col">
                    <h1 className={styles.applicationTitle}>My Applications</h1>
                    {applicationStore.applications?.length === 0 &&
                        <p className={`${styles.applicationSecondary}`}>Here you can keep applications you’ve applied for</p>}
                </span>
                <button onClick={handleAddClick} className="add-app-button">ADD AN APPLICATION</button>
            </div>
            {
                applicationStore.applications?.length === 0
                    ? <EmptyState />
                    : <div className="applications-stata">
                        <table className="app-table">
                            <thead className="app-head">
                                <tr>
                                    <th>Company</th>
                                    <th>Role</th>
                                    <th>Applied date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicationStore.applications.map((r, index) => {
                                    return (
                                        <ApplicationRow app={r} index={index} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            }
            {showAddModal && <AddApplication setShowAddModal={setShowAddModal} />}
        </div >
    )
})

export default Applications;