import DragDrop from "../DragDrop";

const AddApplication = ({ setShowAddModal }) => {

    const handleCloseModal = () => {
        setShowAddModal(false);
    }

    return (
        <div className="dark-screen">
            <div className="add-popup">
                <div className="add-popup-title">
                    <h1 className="add-popup-title-text">Add a New Application</h1>
                </div>
                <div className="add-popup-container">
                    <form>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="job_title">job title*:</label>
                            <input type="text" name="job_title" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="link" >link:</label>
                            <input type="text" name="link" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="company">company*:</label>
                            <input type="text" name="company" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="date">applied, date*:</label>
                            <input type="text" name="date" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="contact">point of contact (recruiter/hiring manager/etc)</label>
                            <input type="text" className="add-popup-contact" name="contact" />
                        </div>
                    </form>
                    <div className="drop-container">
                        <DragDrop mode="resume" />
                        <DragDrop mode="cover" />
                        <div className="add-popup-input-wrapper" style={{ width: '100%' }}>
                            <label htmlFor="description">job description</label>
                            <input type="text" className="add-popup-description" name="description" />
                        </div>
                        <div className="add-popup-button-container">
                            <button onClick={handleCloseModal} className="add-popup-cancel-button">CANCEL</button>
                            <button className="add-popup-save-button">SAVE</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AddApplication;