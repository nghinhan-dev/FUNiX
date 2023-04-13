import React, { useState } from "react";
import expenses from "./Data";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseFilter from "./ExpenseFilter/ExpenseFilter";
import "./style.css";

export default function Lab() {
  const [expenseList, setExpenseList] = useState(expenses);
  const [filterValue, setFilterValue] = useState("All");

  let addExpense = (item) => {
    let newItem = { ...item, id: `e${expenseList.length + 1}` };
    setExpenseList((prevState) => [...prevState, newItem]);
  };

  let filterHandle = (selectedYear) => {
    setFilterValue(selectedYear);
  };

  let updateTitle = (id) => {
    let index = expenseList.findIndex((a) => a.id == id);
    (async () => {
      const { value: text } = await Swal.fire({
        input: "text",
        inputLabel: "Change Tiltle",
        inputPlaceholder: "Type your new title here...",
        inputAttributes: {
          "aria-label": "Type your new title here",
        },
        showCancelButton: true,
      });

      if (text) {
        let newList = expenseList;
        newList[index] = {
          ...newList[index],
          title: text,
        };

        setExpenseList(() => [...newList]);

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: text,
        });
      }
    })();
  };

  let renderExpensesList = expenseList.map((item) => {
    if (filterValue == "All") {
      return (
        <ExpenseItem
          key={item.id}
          date={item.date}
          amount={item.amount}
          title={item.title}
          changeTiltle={() => updateTitle(item.id)}
        />
      );
    } else {
      let itemYear = item.date.split("-")[0];
      if (itemYear == filterValue) {
        return (
          <ExpenseItem
            key={item.id}
            date={item.date}
            amount={item.amount}
            title={item.title}
            changeTiltle={() => updateTitle(item.id)}
          />
        );
      }
    }
  });

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
      <div className="expenses">
        <ExpenseFilter onChangeFilter={filterHandle} />
        {renderExpensesList}
      </div>
    </>
  );
}
