// src/components/ExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const ExpenseForm = ({ fetchExpenses, currentExpense, clearCurrentExpense, isOpen, onClose, setNotification }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        date: '',
    });

    useEffect(() => {
        if (currentExpense) {
            setFormData({
                description: currentExpense.description,
                amount: currentExpense.amount,
                category: currentExpense.category,
                date: currentExpense.date,
            });
        } else {
            setFormData({
                description: '',
                amount: '',
                category: '',
                date: '',
            });
        }
    }, [currentExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentExpense) {
            axios.put(`http://localhost:8000/api/expenses/${currentExpense.id}`, formData)
                .then(response => {
                    fetchExpenses();
                    clearCurrentExpense();
                    setNotification({ message: 'Expense updated successfully!', type: 'success' });
                    onClose();
                })
                .catch(error => {
                    setNotification({ message: 'Failed to update expense.', type: 'error' });
                    console.error('There was an error updating the expense!', error);
                });
        } else {
            axios.post('http://localhost:8000/api/expenses', formData)
                .then(response => {
                    fetchExpenses();
                    setFormData({ description: '', amount: '', category: '', date: '' });
                    setNotification({ message: 'Expense added successfully!', type: 'success' });
                    onClose();
                })
                .catch(error => {
                    setNotification({ message: 'Failed to add expense.', type: 'error' });
                    console.error('There was an error adding the expense!', error);
                });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {currentExpense ? 'Update Expense' : 'Add Expense'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default ExpenseForm;
