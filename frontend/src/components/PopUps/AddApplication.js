import DragDrop from "../DragDrop";
import { useState } from "react";
import { observer } from "mobx-react";
import applicationStore from "../../store/applicationStore";
import styles from "../../styles/applications.module.css";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

const AddApplication = observer(({ setShowAddModal }) => {

    const [jobTitle, setJobTitle] = useState("");
    const [link, setLink] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState(new Date());
    const [contact, setContact] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [unmounting, setUnmounting] = useState(false);

    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);

    const handleCloseModal = () => {
        setUnmounting(true);
        setTimeout(() => setShowAddModal(false), 500);

    }

    const handleTitleChange = (e) => {
        setJobTitle(e.target.value);
    }
    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }
    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    }
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleContactChange = (e) => {
        setContact(e.target.value);
    }
    const handleJDhange = (e) => {
        setJobDescription(e.target.value);
    }

    const handleSave = async () => {
        if (!jobTitle || jobTitle?.length === 0) {
            toast.error("Please provide a job title");
            return;
        }

        if (!date || date?.length === 0) {
            toast.error("Please provide a date");
            return;
        }

        if (!company || company?.length === 0) {
            toast.error("Please provide a company name");
            return;
        }

        const selected_date = new Date(date);
        const year = selected_date.getFullYear();
        const month = String(selected_date.getMonth() + 1).padStart(2, '0');
        const day = String(selected_date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        await applicationStore.postApplication({
            company_name: company,
            position: jobTitle,
            job_description: jobDescription,
            url: link,
            cv: resume,
            cover_letter: coverLetter,
            date: formattedDate,
            contacts: contact
        });
        await applicationStore.getApps();
        handleCloseModal()
    }

    return (
        <div className={`dark-screen ${unmounting && "fade-out"}`}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light" />

            <div className={styles.addPopup}>
                <div className="add-popup-title">
                    <h1 className="add-popup-title-text">Add a New Application</h1>
                </div>
                <div className="add-popup-container">
                    <form>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="job_title">job title*:</label>
                            <input onChange={(e) => handleTitleChange(e)}
                                className="input-add"
                                type="text"
                                name="job_title" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="link" >link:</label>
                            <input onChange={(e) => handleLinkChange(e)}
                                className="input-add"
                                type="text"
                                name="link" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="company">company*:</label>
                            <input onChange={(e) => handleCompanyChange(e)}
                                type="text"
                                name="company" />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label>date*:</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)} />
                        </div>
                        <div className="add-popup-input-wrapper">
                            <label htmlFor="contact">point of contact (recruiter/hiring manager/etc)</label>
                            <textarea onChange={(e) => handleContactChange(e)}
                                className="add-popup-contact"
                                name="contact" />
                        </div>
                    </form>
                    <div className="drop-container">
                        <DragDrop selectedFile={resume}
                            setSelectedFile={setResume}
                            mode="resume" />
                        <DragDrop selectedFile={coverLetter}
                            setSelectedFile={setCoverLetter}
                            mode="cover" />
                        <div className="add-popup-input-wrapper" style={{ width: '100%' }}>
                            <label htmlFor="description">job description</label>
                            <textarea onChange={(e) => handleJDhange(e)}
                                className="add-popup-description"
                                name="description" />
                        </div>
                        <div className="add-popup-button-container">
                            <button onClick={handleCloseModal} className="add-popup-cancel-button">CANCEL</button>
                            <button onClick={handleSave} className="add-popup-save-button">SAVE</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
})

export default AddApplication;