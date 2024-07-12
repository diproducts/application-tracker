import DragDrop from "../DragDrop";
import { useState } from "react";
import { observer } from "mobx-react";
import applicationStore from "../../store/applicationStore";
import styles from "../../styles/applications.module.css";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { useModals } from "../../context/ModalContext";

const AddApplication = observer(({ setIsLoading }) => {
    const [jobTitle, setJobTitle] = useState("");
    const [link, setLink] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState(new Date());
    const [contact, setContact] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [noDate, setNoDate] = useState(false);

    const { hideModal } = useModals();

    const closeModal = () => {
        hideModal("addApp");
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
        setIsLoading(true)
        if (!jobTitle || jobTitle?.length === 0) {
            toast.error("Please provide a job title");
            return;
        }

        if (!company || company?.length === 0) {
            toast.error("Please provide a company name");
            return;
        }

        const data = {
            company_name: company,
            position: jobTitle,
            job_description: jobDescription,
            url: link,
            cv: resume,
            cover_letter: coverLetter,
            contacts: contact
        }

        if (!noDate) {
            const selected_date = new Date(date);
            const year = selected_date.getFullYear();
            const month = String(selected_date.getMonth() + 1).padStart(2, '0');
            const day = String(selected_date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            data.date = formattedDate;
        }

        await applicationStore.postApplication(data);
        await applicationStore.getApps();
        closeModal()
    }

    const handleLabelClick = () => {
        setNoDate(!noDate);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light" />

            <div className={`${styles.addPopup} animate-popUpIn`}>
                <div className="add-popup-title">
                    <h1 className="add-popup-title-text">Add a New Application</h1>
                </div>
                <div className="add-popup-container">
                    <form className="flex flex-col gap-[30px]">
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
                            <label>applied, date*:</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)} />
                            <div className="flex justify-start items-end gap-[2px]">
                                <input
                                    checked={noDate}
                                    onChange={(e) => setNoDate(e.target.value === "on")}
                                    className="w-[13px] h-[13px] rounded-[4px]
                                border-[#595959] border-[1px]" name="check" type="checkbox" />
                                <label
                                    onClick={handleLabelClick}
                                    className="select-none font-inter text-[13px] text-regBlack cursor-pointer"
                                    htmlFor="check">not applied yet</label>
                            </div>
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
                            <button onClick={closeModal} className="add-popup-cancel-button">CANCEL</button>
                            <button onClick={handleSave} className="add-popup-save-button">SAVE</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
})

export default AddApplication;