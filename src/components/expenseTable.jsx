import React, { useState } from 'react'

const ExpenseTable = ({expenses, onUpdate, onDelete}) => {
    
    return <div>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="col">#</th>
                    <th className="col-6">Description</th>
                    <th className="col">Amount</th>
                    <th className="col">Category</th>
                    <th className="col"></th>
                    <th className="col"></th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((e, index) => <tr key={e._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{e.description}</td>
                    <td>${e.amount}</td>
                    <td>{e.category}</td>
                    <td><button className='btn btn-primary' onClick={()=>onUpdate(e._id)}>Update</button></td>
                    <td><button className='btn btn-danger' onClick={()=>onDelete(e._id)}>Delete</button></td>
                </tr>)}
                <tr>
                    <td></td>
                    <th>Total</th>
                    <td>${expenses.reduce((acc,current)=>acc+current.amount,0)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default ExpenseTable