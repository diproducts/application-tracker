import React, { Suspense } from 'react';
import { useModals } from "../../context/ModalContext";
import AddApplication from './AddApplication';
import ApplicationInfo from './ApplicationInfo';

export const ModalManager = () => {
    const { modals } = useModals();

    return (
        <>
            {modals.addApp?.isOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='fixed overflow-auto hidden-scroll inset-0 flex 
                    justify-center z-20'>
                        <div className="fixed inset-0 w-full min-h-screen bg-modalInset blur-[1px]"></div>
                        <div className='relative max-h-full flex justify-center items-center w-full overflow-y-auto hidden-scroll p-[24px]'>
                            <AddApplication {...modals.addApp.props} />
                        </div>
                    </div>
                </Suspense>
            )}
            {modals.appInfo?.isOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='fixed overflow-auto hidden-scroll inset-0 flex 
                                justify-center z-20'>
                        <div className="fixed inset-0 w-full min-h-screen bg-modalInset blur-[1px]"></div>
                        <div className='relative max-h-full flex justify-center items-center w-full overflow-y-auto hidden-scroll p-[24px]'>
                            <ApplicationInfo {...modals.appInfo.props} />
                        </div>
                    </div>
                </Suspense>
            )}
        </>
    )
}