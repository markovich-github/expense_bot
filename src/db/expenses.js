import axios from 'axios';

export function getExpenseById(_id){
    return allExpenses.find(e=>e._id==_id)
}

// export function getExpenses(){
//     return 'http://localhost:3000/expenses'
// }

export function addExpense(expense){
    allExpenses.push(expense);
}

export function updateExpense(currentExpense){
    const expense = allExpenses.find(e=>e._id==currentExpense._id);
    expense.description= currentExpense.description
    expense.amount= currentExpense.amount
    expense.category= currentExpense.category
}