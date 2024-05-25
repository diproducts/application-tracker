import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import { useState } from "react";
import DragDrop from "../DragDrop";
import { useModals } from "../../context/ModalContext";
import { observer } from "mobx-react";
import applicationStore from "../../store/applicationStore";

export const EditApplication = observer(({ app, setIsLoading }) => {
    const [resume, setResume] = useState(app?.cv ? { name: "something" } : null);
    const [coverLetter, setCoverLetter] = useState(app?.cover_letter ? { name: "something" } : null);
    const [date, setDate] = useState(new Date(app?.phases[0]?.date));
    const [jobTitle, setJobTitle] = useState(app?.position);
    const [link, setLink] = useState(app?.url);
    const [company, setCompany] = useState(app?.company_name);
    const [contacts, setContacts] = useState(app?.phases[0]?.contacts);
    const [jobDescription, setJobDescription] = useState(app?.job_description);

    const { hideModal } = useModals();

    const closeModal = () => {
        hideModal("appEdit");
    }

    const handleTitleChange = (e) => {
        setJobTitle(e.target.value);
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }

    const handleCompanyChange = (e) => {
        setCompany(e.target.value)
    }

    const handleContactChange = (e) => {
        setContacts(e.target.value)
    }

    const handleJDhange = (e) => {
        setJobDescription(e.target.value);
    }

    const handleSave = async () => {
        setIsLoading(true);
        const { fields, cover_letter, cv } = checkForUpdate();
        if (fields?.length !== 0 || cover_letter || cv) {
            await applicationStore.updateApplication(app?.id, fields, cv, cover_letter);
        }

        const data = checkForPhase();
        if (data?.length !== 0) {
            await applicationStore.updatePhase(data, app?.id, app?.phases[0]?.id)
        }

        applicationStore.getApps().then(() => closeModal())
    }

    const checkForUpdate = () => {
        let cv;
        let cover_letter;
        let fields = {};
        if (resume && resume?.type) {
            cv = resume;
        }
        if (coverLetter && coverLetter?.type) {
            cover_letter = coverLetter;
        }

        if (link && link !== app?.url) {
            fields.url = link;
        }

        if (company && company !== app?.company_name) {
            fields.company_name = company;
        }

        if (jobTitle && jobTitle !== app?.position) {
            fields.position = jobTitle;
        }

        if (jobDescription && jobDescription !== app?.job_description) {
            fields.job_description = jobDescription;
        }

        return {
            fields, cv, coverLetter
        }
    }

    const checkForPhase = () => {
        let fields = {};
        if (contacts && contacts !== app?.phases[0]?.contacts) {
            fields.contacts = contacts;
        }
        const selected_date = new Date(date);
        const year = selected_date.getFullYear();
        const month = String(selected_date.getMonth() + 1).padStart(2, '0');
        const day = String(selected_date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        if (app.phases[0].date !== formattedDate) {
            fields.date = formattedDate;
        }

        return fields;
    }

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

            <div className={`bg-softWhite px-[24px] pt-[30px] pb-[27px] 
            rounded-[7px] animate-popUpIn`}>
                <p className="font-noto text-[16px] text-[#434343]
                font-medium">Edit Appliction</p>
                <div className="flex pt-[30px]">
                    <form className='flex justify-start items-start flex-col gap-[30px]'>
                        <div className="w-[80%]">
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]' htmlFor="job_title">job title*:</label>
                            <input onChange={(e) => handleTitleChange(e)}
                                value={jobTitle}
                                className="input-add"
                                type="text"
                                name="job_title" />
                        </div>
                        <div className="w-[80%]">
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]' htmlFor="link" >link:</label>
                            <input onChange={(e) => handleLinkChange(e)}
                                className="truncate"
                                value={link}
                                type="text"
                                name="link" />
                        </div>
                        <div className="w-[80%]">
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]' htmlFor="company">company*:</label>
                            <input onChange={(e) => handleCompanyChange(e)}
                                type="text"
                                value={company}
                                name="company" />
                        </div>
                        <div className="w-[80%]">
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]'>applied, date*:</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)} />
                        </div>
                        <div className="w-[80%]">
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]' htmlFor="contact">point of contact (recruiter/hiring manager/etc):</label>
                            <textarea onChange={(e) => handleContactChange(e)}
                                value={contacts}
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
                            <label className='text-[#434343]
                            font-inter font-normal text-[13px]' htmlFor="description">job description:</label>
                            <textarea onChange={(e) => handleJDhange(e)}
                                value={jobDescription}
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