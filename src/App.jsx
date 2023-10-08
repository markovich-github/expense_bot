import React, { useEffect, useState } from 'react'
import ExpenseTable from './components/expenseTable'
import ExpenseForm from './components/expenseForm'
import { addExpense, allExpenses, getExpenses, getExpenseById, updateExpense } from './db/expenses'
import { allCategories } from './db/categories'
import Pagination from './components/pagination'
import paginate from './utils/paginate'
import ListGroup from './components/common/listGroup'

const App = () => {
  const [expenses, setExpenses] = useState(allExpenses)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [categories, setCategories] = useState(allCategories);
  const [currentCategory, setCurrentCategory] = useState();
  

  const filteredExpenses = currentCategory && currentCategory != 'All Categories' ? allExpenses.filter(e => e.category == currentCategory) : allExpenses
  const paginateExpenses = paginate(filteredExpenses, currentPage, pageSize)
  
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
    updateExpense(currentExpense);
    setUpdating(false)
  }

  const handlePagination = (page) =>{
    setCurrentPage(page);
  }
  
  const filterCategory = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    console.log(currentCategory);
  }

  useEffect(()=>{
    setCategories([{_id:'0', name:'All Categories'},...categories]);
    
  },[])

  
  return <div className='col-10 mx-auto mt-5'>
    <h1>Expense Bot</h1>

    <ExpenseForm categories={allCategories} currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} onSubmit={handleSubmit} updating={updating} onUpdate={onUpdate}/>

    <div className='row'>
      <div className='col-2'>
      <ListGroup items={categories}
        onItemSelect={filterCategory}
        selectedItem={currentCategory} />
      </div>

      <div className='col mx-4'>
      <ExpenseTable expenses={paginateExpenses} onUpdate={handleUpdate} onDelete={handleDelete} />

      <Pagination totalItems={expenses.length} pageSize={pageSize} currentPage={currentPage} onPagination={handlePagination}/>
      </div>

    </div>
  </div>
}

export default App
