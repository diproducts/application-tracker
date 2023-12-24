import AddApplication from "../components/PopUps/AddApplication";
import { observer } from "mobx-react";
import applicationStore from "../store/applicationStore";
import { useState, useEffect } from "react";
import { ApplicationRow } from "../components/Dashboard/ApplicationRow";

const Applications = observer(() => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    useEffect(() => {
        applicationStore.getApps();
    }, [])


    return (
        <div className="applications-container">
            <div className="applications-header">
                <h1 className="application-header-title">My Applications</h1>
                <button onClick={handleAddClick} className="add-app-button">ADD AN APPLICATION</button>
            </div>
            <div className="applications-stata">
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
            {showAddModal && <AddApplication setShowAddModal={setShowAddModal} />}
        </div>
    )
})

export default Applications;