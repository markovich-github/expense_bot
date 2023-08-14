import React, { useState } from 'react'
import ExpenseTable from './components/expenseTable'
import ExpenseForm from './components/expenseForm'
import { addExpense, allExpenses, getExpenses, getExpenseById, updateExpense } from './db/expenses'
import { allCategories } from './db/categories'

const App = () => {
  const [expenses, setExpenses] = useState(allExpenses)
  
  const expense = {
    _id: Date.now().toString(),
    description: '',
    amount: 0,
    category: ''
  }
  const [currentExpense, setCurrentExpense] = useState(expense)
  const [updating, setUpdating] = useState(false);

  const handleUpdate = (_id) => {
    const updateExpense = expenses.find(e=>e._id==_id)
    setCurrentExpense(updateExpense);
    setUpdating(true)
  }

  const handleDelete = (_id) => {
    setExpenses(expenses.filter(item => item._id != _id))
  }

  const handleSubmit = (event, currentExpense) => {
    event.preventDefault(),
    addExpense(currentExpense)
    setExpenses(getExpenses())
    setCurrentExpense(expense)
  }

  const onUpdate = (currentExpense) => {
    // setExpenses([currentExpense])
    // setCurrentExpense(expense)
    updateExpense(currentExpense)
    console.log(getExpenses());
    setUpdating(false)
  }

  
  return <div className='col-10 mx-auto mt-5'>
    <h1>Expense Bot</h1>
    <ExpenseForm categories={allCategories} currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} onSubmit={handleSubmit} updating={updating} onUpdate={onUpdate}/>
    <ExpenseTable expenses={expenses} onUpdate={handleUpdate} onDelete={handleDelete} />
  </div>
}

export default App