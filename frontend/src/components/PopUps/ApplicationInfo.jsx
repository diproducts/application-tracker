import { useModals } from "../../context/ModalContext";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "../../helpers/formatters";

const Copy = () => <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
    <rect x="0.5" y="2.5" width="4" height="5" stroke="white" />
    <rect x="2.5" y="0.5" width="4" height="5" fill="#CCCBFB" stroke="white" />
</svg>

const Arrow = () => <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6" fill="none">
    <path d="M6.24847 1.02761C6.26372 0.890381 6.16483 0.766776 6.02761 0.751529L3.79137 0.503058C3.65414 0.487811 3.53054 0.586694 3.51529 0.723921C3.50004 0.861148 3.59893 0.984752 3.73615 1L5.72392 1.22086L5.50306 3.20863C5.48781 3.34586 5.58669 3.46946 5.72392 3.48471C5.86115 3.49996 5.98475 3.40107 6 3.26385L6.24847 1.02761ZM1.15617 5.19522L6.15617 1.19522L5.84383 0.804783L0.843826 4.80478L1.15617 5.19522Z" fill="white" />
</svg>


export const ApplicationInfo = ({ app, setIsLoading }) => {
    const { hideModal, showModal } = useModals();
    const [statusHovered, setStatusHovered] = useState(false);
    const [contacts, setContacts] = useState(null);
    const closeModal = () => {
        hideModal("appInfo")
    }

    useEffect(() => {
        if (app?.phases[0]?.contacts) {
            setContacts(app?.phases[0]?.contacts)
        }
    }, [app?.phases])

    const handleOpenUrlLink = () => {
        window.open(app?.url, "_blank")
    }

    const handleOpenCVLink = () => {
        window.open(app?.cv, "_blank");
    }

    const handleCopyUrlLink = async () => {
        await navigator.clipboard.writeText(app?.url);
        toast("Link was copied to your clipboard!")
    }

    const handleEdit = () => {
        closeModal();
        showModal("appEdit", { app, setIsLoading })
    }

    const handleOpenCoverLink = () => {
        window.open(app?.cover_letter, "_blank");
    }

    const Chevron = () => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
        <line x1="0.473785" y1="1" x2="3.9798" y2="4.50601" stroke="#6BA6FF" strokeWidth="0.670034" strokeLinecap="round" />
        <line x1="4.02002" y1="4.50571" x2="7.52603" y2="0.999695" stroke="#6BA6FF" strokeWidth="0.670034" strokeLinecap="round" />
    </svg>

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
            <div className="bg-white  gap-[35px] h-fit animate-popUpIn rounded-[8px] lg:px-[79px] lg:pt-[56px]
        lg:pb-[33px] flex flex-col">

                <div className="flex">
                    <div className="lg:min-w-[290px] justify-between flex flex-col">
                        <div className="text-black flex flex-col gap-[17px]">
                            <span>
                                <p className="max-w-[80%] truncate text-notosans-500 text-[20px]">{app.position}</p>
                                <p className="text-standard-inter text-[15px]">at {app.company_name}</p>
                            </span>

                            <div className="min-h-[20px] flex gap-[9px]">
                                {app?.url && <a className="text-purple text-inter-700 text-[13px]
                        underline underline-offset-[2px]"
                                    target="_blank"
                                    href={app.url}>Link</a>}
                                {app?.url && <span className="flex gap-[5px]">
                                    <span onClick={handleCopyUrlLink} className="cursor-pointer bg-lightViolet border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center  h-[20px] px-[8px]
                            flex justify-center items-center gap-[3px]">
                                        <p className="font-inter text-[14px] text-white font-medium leading-[90%]">copy</p><Copy />
                                    </span>
                                    <span onClick={handleOpenUrlLink} className="cursor-pointer bg-paleBlue border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center h-[20px] px-[8px]
                            gap-[3px]">
                                        <p className="font-inter text-[14px] text-white font-medium leading-[90%]">open</p><Arrow />
                                    </span>
                                </span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px] items-start">
                            <p className="font-inter text-black font-bold
                            text-[13px]">Point of contact{contacts && ":"}</p>
                            {contacts
                                ? <></>
                                : <span onClick={handleEdit} className="cursor-pointer bg-lightViolet border-[1px] border-solid border-lightBlue
                                rounded-[5px] hover:opacity-70 flex justify-center items-center pb-[3px] h-[20px] px-[8px]
                                text-white text-inter-500 text-[14px] text-center">add +</span>}
                        </div>

                        <div className="flex flex-col gap-[20px]">
                            <div className="flex flex-col gap-[8px] items-start">
                                <span className="flex justify-between lg:w-[170px] items-center">
                                    <p className="font-inter text-black font-bold
                            text-[13px]">Resume</p>
                                    {app?.cv && <span onClick={handleOpenCVLink} className="cursor-pointer bg-paleBlue border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center h-[20px] px-[8px]
                            gap-[3px]">
                                        <p className="font-inter text-[14px] text-white font-medium leading-[90%]">open</p><Arrow />
                                    </span>}
                                </span>
                                {!app?.cv && <span onClick={handleEdit} className="cursor-pointer bg-lightViolet border-[1px] border-solid border-lightBlue
                                rounded-[5px] hover:opacity-70 flex justify-center items-center pb-[3px] h-[20px] px-[8px]
                                text-white text-inter-500 text-[14px] text-center">add +</span>}
                            </div>
                            <div className="flex flex-col gap-[8px] items-start">
                                <span className="flex justify-between lg:w-[170px] items-center">
                                    <p className="font-inter text-black font-bold
                            text-[13px]">Cover Letter</p>
                                    {app?.cover_letter && <span onClick={handleOpenCoverLink} className="cursor-pointer bg-paleBlue border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center h-[20px] px-[8px]
                            gap-[3px]">
                                        <p className="font-inter text-[14px] text-white font-medium leading-[90%]">open</p><Arrow />
                                    </span>}
                                </span>
                                {!app?.cover_letter && <span onClick={handleEdit} className="cursor-pointer bg-lightViolet border-[1px] border-solid border-lightBlue
                                rounded-[5px] hover:opacity-70 flex justify-center items-center pb-[3px] h-[20px] px-[8px]
                                text-white text-inter-500 text-[14px] text-center">add +</span>}
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-[35px]">
                        <div className="gap-[70px] flex justify-between items-center">
                            {app.phases[0]?.date
                                ? <span className="text-black">
                                    <p className="text-standard-inter text-[15px]">applied on</p>
                                    <p className="text">{app.phases[0]?.date}</p>
                                </span>
                                : <span className="text-black">
                                    <p className="text-standard-inter text-[15px]">not applied</p>
                                </span>}
                            <div onMouseEnter={() => setStatusHovered(true)}
                                onMouseLeave={() => setStatusHovered(false)}
                                className={`lg:w-[293px] border-blue border-solid border-[1px]
                        rounded-[7px] h-[52px] ${statusHovered ? "border-blueHover" : ""} hover:border-blueHover flex items-center px-[21px] justify-between cursor-pointer`}>
                                <p className={`${statusHovered ? "text-blueHover" : ""} capitalize hover:text-blueHover text-bold-inter text-[15px] text-blue`}>
                                    {app.phases.length > 0
                                        ? app.phases[app.phases?.length - 1]?.name
                                        : "Applicaton saved"}</p>
                                <Chevron />
                            </div>
                        </div>

                        <div className="mt-[12px] w-full flex flex-col gap-[5px]">
                            <div className="w-full pl-[14px]">
                                <p className="text-inter-700 text-black text-[13px]">History</p>
                            </div>
                            <div className="h-[230px] flex flex-col gap-[16px] px-[14px] py-[16px] overflow-auto hidden-scroll w-full rounded-[6px] border-[#BABABA] border-[0.6px] border-solid">
                                {app?.phases?.length > 0
                                    ? app.phases.map((phase) => {
                                        return (
                                            <p className="text-standard-inter text-black text-[15px]">{phase.name.slice(0, 1).toUpperCase() + phase.name.slice(1)} on {formatDate(phase.date)}</p>
                                        )
                                    })
                                    : <p className="text-[#595959] text-inter-500 italic text-[13px]">No events yet</p>}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-end items-center gap-[24px]">
                    <button onClick={closeModal} className="border-blue border-[1.2px] border-solid h-[40px] rounded-[7px] px-[38px] text-[14px]
                    text-standard-inter text-blue hover:border-blueHover hover:text-blueHover uppercase">cancel</button>
                    <button className="bg-blue h-[40px] rounded-[7px] px-[49px] text-[14px]
                    text-standard-inter hover:bg-blueMainHover text-white uppercase">save</button>
                </div>
            </div>
        </>
    )
}

export default ApplicationInfo;