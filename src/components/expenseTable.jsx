import React, { useState } from 'react'
import ArrowIcon from './common/arrorIcon';


const ExpenseTable = ({expenses, onUpdate, onDelete, onSort, sortColumn}) => {

    const renderArrow = (currentColumn) => {
        if(currentColumn==sortColumn.path)
          return sortColumn.order=='asc'?<ArrowIcon order='asc'/>:<ArrowIcon order='desc'/>
        else
          return null;  
      }
    
    
    return <div className='my-4'>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="col">#</th>
                    <th className="col-6">Description</th>
                    <th className="col" onClick={()=>onSort('amount')}>Amount<span className='mx-2'>{renderArrow('amount')}</span></th>
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