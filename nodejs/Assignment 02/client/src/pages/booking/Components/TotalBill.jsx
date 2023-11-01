import React from "react";

export default function TotalBill({ total, errors }) {
  return (
    <div className="overall">
      <p className="title">Total Bill: ${total}</p>
      <input type="hidden" name="total" value={total} />
      <select name="method">
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
      </select>
      {errors?.method && <p className="error-msg">{errors.method}</p>}
      <button>Reserve</button>
    </div>
  );
}
