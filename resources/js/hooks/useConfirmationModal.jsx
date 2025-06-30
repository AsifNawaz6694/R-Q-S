import { useState } from 'react';

export default function useConfirmationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'warning',
        confirmButtonClass: 'bg-red-600 hover:bg-red-700',
        cancelButtonClass: 'bg-gray-600 hover:bg-gray-700'
    });

    const openModal = (options = {}) => {
        setConfig(prev => ({
            ...prev,
            ...options
        }));
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        openModal,
        closeModal,
        config
    };
}
