import "./ExpenseForm.css";

export default function ExpenseCreate({ create }) {
  return (
    <div className="new-expense">
      <div className="new-expense__actions">
        <button onClick={create} className="addFormBtn" type="submit">
          Add New Form
        </button>
      </div>
    </div>
  );
}
