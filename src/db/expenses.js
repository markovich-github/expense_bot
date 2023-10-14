export const allExpenses = [
    { _id:101, description: 'task1', amount: 360, category: 'Entertainment' },
    { _id:102, description: 'task2', amount: 200, category: 'Utlities' },
    { _id:103, description: 'task3', amount: 300, category: 'Groceries' },
    { _id:104, description: 'task4', amount: 100, category: 'Groceries' },
    { _id:105, description: 'task5', amount: 400, category: 'Groceries' },
    { _id:106, description: 'task6', amount: 600, category: 'Groceries' },
    { _id:107, description: 'task7', amount: 700, category: 'Groceries' }
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