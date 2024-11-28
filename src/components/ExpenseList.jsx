// src/components/ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses, handleEdit, handleDelete, handleShowDetail }) => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <ul className="list-disc pl-5">
                {expenses.map(expense => (
                    <li key={expense.id} className="mb-2 flex justify-between items-center">
                        <span>{expense.description}: ${expense.amount}</span>
                        <div>
                            <button
                                onClick={() => handleShowDetail(expense)}
                                className="ml-2 px-2 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                            >
                                Show
                            </button>
                            <button
                                onClick={() => handleEdit(expense)}
                                className="ml-2 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(expense.id)}
                                className="ml-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
