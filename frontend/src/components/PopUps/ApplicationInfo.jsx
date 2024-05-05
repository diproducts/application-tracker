import { useModals } from "../../context/ModalContext";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "../../helpers/formatters";

export const ApplicationInfo = ({ app }) => {
    const { hideModal } = useModals();
    const [statusHovered, setStatusHovered] = useState(false);
    const closeModal = () => {
        hideModal("appInfo")
    }

    const handleOpenLink = () => {
        window.open(app?.url, "_blank")
    }

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(app?.url);
        toast("Link was copied to your clipboard!")
    }

    const Chevron = () => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
        <line x1="0.473785" y1="1" x2="3.9798" y2="4.50601" stroke="#6BA6FF" strokeWidth="0.670034" strokeLinecap="round" />
        <line x1="4.02002" y1="4.50571" x2="7.52603" y2="0.999695" stroke="#6BA6FF" strokeWidth="0.670034" strokeLinecap="round" />
    </svg>

    return (
        <div className="bg-white animate-popUpIn rounded-[8px] lg:px-[79px] lg:pt-[56px]
        lg:pb-[33px] flex justify-center items-start">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light" />

            <div className="lg:min-w-[290px]">
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
                            <span onClick={handleCopyLink} className="cursor-pointer bg-lightViolet border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center pb-[3px] h-[20px] px-[8px]
                            text-white text-inter-500 text-[14px] text-center">copy</span>
                            <span onClick={handleOpenLink} className="cursor-pointer bg-paleBlue border-[1px] border-solid border-lightBlue
                            rounded-[5px] hover:opacity-70 flex justify-center items-center h-[20px] px-[8px]
                            text-white text-inter-500 text-[14px] pb-[3px] text-center">open</span>
                        </span>}
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

                <div className="flex justify-end items-center gap-[24px]">
                    <button onClick={closeModal} className="border-blue border-[1.2px] border-solid h-[40px] rounded-[7px] px-[38px] text-[14px]
                    text-standard-inter text-blue hover:border-blueHover hover:text-blueHover uppercase">cancel</button>
                    <button className="bg-blue h-[40px] rounded-[7px] px-[49px] text-[14px]
                    text-standard-inter hover:bg-blueMainHover text-white uppercase">save</button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationInfo;