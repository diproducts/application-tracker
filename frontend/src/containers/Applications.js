import AddApplication from "../components/PopUps/AddApplication";
import { observer } from "mobx-react";
import applicationStore from "../store/applicationStore";
import { useState, useEffect } from "react";

const Applications = observer(() => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    useEffect(() => {
        applicationStore.getApps();
    }, [])

    const table_data = [
        {
            company: "Rockstar Games, Inc",
            role: "Lead C++ Developer",
            applied_date: "5/13/2023",
            status: "Interview I Scheduled"
        },
        {
            company: "Carnitas International",
            role: "Senior Java Engineer L7/System Architect",
            applied_date: "5/18/2023",
            status: "Waiting for Response"
        }
    ]

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
                        </tr>
                    </thead>
                    <tbody>
                        {applicationStore.applications.map((r, index) => {
                            return (
                                <tr key={index + Math.floor(Math.random())}>
                                    <td>{r.company_name}</td>
                                    <td>{r.position}</td>
                                    <td>{r.phases[0].date}</td>
                                    <td>{r.phases[r.phases.length - 1].name}</td>
                                </tr>
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