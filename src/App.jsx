// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import axios from 'axios';

const ExpenseList = lazy(() => import('./components/ExpenseList'));
const ExpenseForm = lazy(() => import('./components/ExpenseForm'));
const ExpenseDetail = lazy(() => import('./components/ExpenseDetail'));
const ConfirmModal = lazy(() => import('./components/ConfirmModal'));
const Notification = lazy(() => import('./components/Notification'));

function App() {
    const [expenses, setExpenses] = useState([]);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [detailExpense, setDetailExpense] = useState(null);
    const [deleteExpenseId, setDeleteExpenseId] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    const fetchExpenses = () => {
        axios.get('http://localhost:8000/api/expenses')
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the expenses!', error);
            });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleEdit = (expense) => {
        setCurrentExpense(expense);
        setIsFormModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteExpenseId(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8000/api/expenses/${deleteExpenseId}`)
            .then(response => {
                fetchExpenses();
                setNotification({ message: 'Expense deleted successfully!', type: 'success' });
                setIsConfirmModalOpen(false);
                setDeleteExpenseId(null);
            })
            .catch(error => {
                setNotification({ message: 'Failed to delete expense.', type: 'error' });
                console.error('There was an error deleting the expense!', error);
            });
    };

    const handleShowDetail = (expense) => {
        setDetailExpense(expense);
        setIsDetailModalOpen(true);
    };

    const clearCurrentExpense = () => {
        setCurrentExpense(null);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        clearCurrentExpense();
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDeleteExpenseId(null);
    };

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <div className="App container mx-auto p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <button
                    onClick={() => setIsFormModalOpen(true)}
                    className="mb-4 px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Add Expense
                </button>
                <ExpenseForm
                    fetchExpenses={fetchExpenses}
                    currentExpense={currentExpense}
                    clearCurrentExpense={clearCurrentExpense}
                    isOpen={isFormModalOpen}
                    onClose={closeFormModal}
                    setNotification={setNotification}
                />
                <ExpenseList
                    expenses={expenses}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleShowDetail={handleShowDetail}
                />
                {detailExpense && (
                    <ExpenseDetail
                        expense={detailExpense}
                        isOpen={isDetailModalOpen}
                        onClose={closeDetailModal}
                    />
                )}
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onClose={closeConfirmModal}
                    onConfirm={confirmDelete}
                />
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={closeNotification}
                    />
                )}
            </Suspense>
        </div>
    );
}

export default App;
