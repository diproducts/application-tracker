import AddApplication from "../components/PopUps/AddApplication";
import { useState } from "react";

const Applications = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

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
                        {table_data.map((r, index) => {
                            return (
                                <tr key={index + Math.floor(Math.random())}>
                                    <td>{r.company}</td>
                                    <td>{r.role}</td>
                                    <td>{r.applied_date}</td>
                                    <td>{r.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {showAddModal && <AddApplication setShowAddModal={setShowAddModal} />}
        </div>
    )
}

export default Applications;