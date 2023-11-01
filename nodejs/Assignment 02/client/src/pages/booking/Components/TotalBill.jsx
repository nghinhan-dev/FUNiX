import React from "react";
import { useUser } from "../../../context/UserContext";
import { toast } from "react-toastify";

export default function TotalBill({ total, errors }) {
  const { user } = useUser();

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
      {user ? (
        <button type="submit">Reserve</button>
      ) : (
        <button
          onClick={() => toast.warning("Must login first")}
          type="button"
          className="btn"
        >
          Reserve
        </button>
      )}
    </div>
  );
}
