export const allExpenses = [
    { _id:101, description: 'task1', amount: 100, category: 'Entertainment' },
    { _id:102, description: 'task2', amount: 200, category: 'Utlities' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' }
]

export function getExpenseById(_id){
    return allExpenses.find(e=>e._id==_id)
}

export function getExpenses(){
    return allExpenses
}

export function addExpense(expense){
    allExpenses.push(expense);
}

export function updateExpense(currentExpense){
    const expense = allExpenses.find(e=>e._id==currentExpense._id);
    expense.description= currentExpense.description
    expense.amount= currentExpense.amount
    expense.category= currentExpense.category
}