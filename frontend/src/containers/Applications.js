import { observer } from "mobx-react";
import { EmptyState } from "../components/Dashboard/Applications/EmptyState";
import { AppTable } from "../components/Dashboard/Applications/AppTable";
import styles from "../styles/applications.module.css"
import { useModals } from "../context/ModalContext";
import applicationStore from "../store/applicationStore";

const Applications = observer(({ isLoading, setIsLoading }) => {
    const { showModal } = useModals();

    const handleAddClick = () => {
        showModal("addApp", { setIsLoading })
    }


    return (
        <div className={`w-full flex justify-center items-start pt-[70px] dashboardContainer`}>
            <div className="w-[72%]">
                <div className="flex flex-col justify-start max-[640px]:gap-[20px] sm:flex-row h-fit sm:justify-between sm:items-center">
                    <span className="flex flex-col">
                        <h1 className={styles.applicationTitle}>My Applications</h1>
                    </span>
                    <button onClick={handleAddClick} className="add-app-button">ADD AN APPLICATION</button>
                </div>
                {
                    isLoading
                        ? <div className="w-[60vw] flex justify-center items-center mt-[10vh]">
                            <div
                                className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#666] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                ></span>
                            </div>
                        </div>
                        : applicationStore.applications?.length === 0
                            ? <EmptyState />
                            : <AppTable isLoading={isLoading} setIsLoading={setIsLoading} />
                }
            </div>
        </div >
    )
})

export default Applications;