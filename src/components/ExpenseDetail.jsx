// src/components/ExpenseDetail.jsx
import React from 'react';
import Modal from './Modal';

const ExpenseDetail = ({ expense, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-2">Expense Details</h2>
                <p><strong>Description:</strong> {expense.description}</p>
                <p><strong>Amount:</strong> ${expense.amount}</p>
                <p><strong>Category:</strong> {expense.category}</p>
                <p><strong>Date:</strong> {expense.date}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ExpenseDetail;
