import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModals = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({});

    const showModal = (name, props = {}) =>
        setModals(prev => ({ ...prev, [name]: { isOpen: true, props } }));

    const hideModal = (name) =>
        setModals(prev => ({ ...prev, [name]: { ...prev[name], isOpen: false } }));

    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};