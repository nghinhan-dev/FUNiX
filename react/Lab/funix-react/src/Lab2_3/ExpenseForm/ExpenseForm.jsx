import React from "react";
import { useForm } from "react-hook-form";
import "./ExpenseForm.css";

export default function ExpenseForm({ addExpense }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addExpense(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="new-expense">
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true, maxLength: 10 })}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              placeholder="Date"
              {...register("date", {
                required: true,
              })}
            />
          </div>
          <div className="new-expense__actions">
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}
