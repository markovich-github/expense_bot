import React, { useState } from 'react';

const ExpenseForm = ({ categories, currentExpense, setCurrentExpense, onSubmit, updating, onUpdate }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = () => {
    if (!currentExpense.description) {
      setErrorMessage('Description is required.');
      return false;
    }
    if (currentExpense.amount === null || currentExpense.amount === 0) {
      setErrorMessage('Amount must be a valid number.');
      return false;
    }
    if (!currentExpense.category) {
      setErrorMessage('Category is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      onSubmit(event, currentExpense);
    }
  };

  return (
    <div className="my-5">
      <form>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="mb-3 col-8">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) =>
              setCurrentExpense({
                ...currentExpense,
                description: event.target.value,
              })
            }
            value={currentExpense.description}
          />
        </div>
        <div className="row">
          <div className="mb-3 col-3">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(event) =>
                setCurrentExpense({
                  ...currentExpense,
                  amount: parseFloat(event.target.value) || 0,
                })
              }
              value={currentExpense.amount}
            />
          </div>
          <div className="mb-3 col-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(event) =>
                setCurrentExpense({
                  ...currentExpense,
                  category: event.target.value,
                })
              }
              value={currentExpense.category}
            >
              <option value="">Select Category...</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!updating && (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit} 
          >
            Submit
          </button>
        )}
        {updating && (
          <button type="button" className="btn btn-primary" onClick={() => onUpdate(currentExpense)}>
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
