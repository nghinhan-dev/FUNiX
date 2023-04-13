import "./ExpenseDate.css";

export default function ExpenseDate({ date }) {
  const [year, month, day] = date.split("-");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[parseInt(month) - 1];

  return (
    <div className="expense-date">
      <div className="expense-date__month">{monthName}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}
