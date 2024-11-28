// src/components/ConfirmModal.jsx
import React from 'react';
import Modal from './Modal';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
                <p>Are you sure you want to delete this expense?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-4 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
