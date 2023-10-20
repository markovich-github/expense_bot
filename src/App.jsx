import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import ExpenseTable from './components/expenseTable'
import ExpenseForm from './components/expenseForm'
import Pagination from './components/pagination'
import paginate from './utils/paginate'
import ListGroup from './components/common/listGroup'
import SearchBox from './components/common/searchBox'
import axios from 'axios'
//testing

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentSearch, setCurrentSearch] = useState('')

  let filteredExpenses;
  if(currentSearch)
    filteredExpenses = expenses.filter( e => e.description.toLowerCase().startsWith(currentSearch.toLowerCase()))
  else
    filteredExpenses = currentCategory && currentCategory != 'All Categories' ? expenses.filter(e => e.category == currentCategory) : expenses;
  const [sortColumn, setSortColumn] = useState({ path: 'amount', order: 'asc' })
  const sortedExpenses = _.orderBy(filteredExpenses, [sortColumn.path], [sortColumn.order])
  const paginateExpenses = paginate(sortedExpenses, currentPage, pageSize)
  
  const expense = {
    _id: Date.now().toString(),
    description: '',
    amount: 0,
    category: ''
  }
  const [currentExpense, setCurrentExpense] = useState(expense)
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (_id) => {
    const updateExpense = expenses.find(e=>e._id==_id)
    setCurrentExpense(updateExpense);
    setUpdating(true)
  }

  const handleDelete = (_id) => {

    axios.delete('http://localhost:3000/expenses'+'/'+_id)
      .then(()=>setExpenses(expenses.filter(item => item._id != _id)))
      .catch((err)=>console.log(err.response.data))
  }

  const handleSubmit = async (event, currentExpense) => {
    event.preventDefault(),
    setCurrentExpense(expense)
    await axios.post('http://localhost:3000/expenses', currentExpense)
    await axios.get('http://localhost:3000/expenses')
      .then(res=>setExpenses([...res.data]))
      .catch(err=>console.log(err.messaage))
  }

  const onUpdate = async (currentExpense) => {

    await axios.put('http://localhost:3000/expenses'+'/'+currentExpense._id, currentExpense)
    await axios.get('http://localhost:3000/expenses')
      .then(res=>setExpenses([...res.data]))
      .catch(err=>console.log(err.messaage))

    setCurrentExpense(expense)
    setUpdating(false)
  }

  const handlePagination = (page) =>{
    setCurrentPage(page);
  }
  
  const filterCategory = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  }

  const handleSort = (path) => {
    let newSort = { ...sortColumn }
    if (newSort.path == path)
      newSort.order = (newSort.order === 'asc') ? 'desc' : 'asc';
    else
      newSort = { path: path, order: 'asc' }
    setSortColumn(newSort)
  }

  const handleSearch = (searchQuery) => {
    setCurrentSearch(searchQuery)
    setCurrentCategory(null)
    setCurrentPage(1);
  }


  useEffect(()=>{
    
    axios.get('http://localhost:3000/categories')
      .then(res=>setCategories([...res.data]))
      .catch(err=>console.log(err.messaage))

    axios.get('http://localhost:3000/expenses')
      .then(res=>setExpenses([...res.data]))
      .catch(err=>console.log(err.messaage))

    
  },[])

  console.log(expenses);
  
  return <div className='col-10 mx-auto mt-5'>
    <h1>Expense Bot</h1>

    <ExpenseForm categories={categories} currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} onSubmit={handleSubmit} updating={updating} onUpdate={onUpdate}/>

    <div className='row'>
      <div className='col-2'>
      <ListGroup items={categories}
        onItemSelect={filterCategory}
        selectedItem={currentCategory} />
      </div>

      <div className='col mx-4'>
      <SearchBox placeholder='Search...' value={currentSearch} onChange={handleSearch}/>
      <ExpenseTable expenses={paginateExpenses} onUpdate={handleUpdate} onDelete={handleDelete} onSort={handleSort} sortColumn={sortColumn}/>

      <Pagination totalItems={filteredExpenses.length} pageSize={pageSize} currentPage={currentPage} onPagination={handlePagination}/>
      </div>

    </div>
  </div>
}

export default App
