import "./ExpenseItem.css";
import ExpenseDate from "../ExpenseDate/ExpenseDate";

export default function ExpenseItem({ date, title, amount, changeTiltle }) {
  return (
    <div className="expense-item">
      <div className="expense-item__description">
        <ExpenseDate date={date} />
        <h2>${title}</h2>
        <div className="expense-item__price">${amount}</div>
        <button onClick={changeTiltle} className="expense-button">
          Change Title
        </button>
      </div>
    </div>
  );
}
