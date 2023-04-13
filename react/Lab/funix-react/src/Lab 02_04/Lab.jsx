import React, { useState } from "react";
import expenses from "./Data";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseCreate from "./ExpenseForm/ExpenseCreate";
import ExpenseFilter from "./ExpenseFilter/ExpenseFilter";
import "./style.css";

export default function Lab() {
  const [expenseList, setExpenseList] = useState(expenses);
  const [filterValue, setFilterValue] = useState("All");
  const [isCreate, setIsCreate] = useState(true);

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
      } else {
        return "";
      }
    }
  });

  function isFullOfEmptyStrings(arr) {
    return arr.every((str) => typeof str === "string" && str.trim() === "");
  }

  function createHandle() {
    setIsCreate((prevState) => !prevState);
  }

  return (
    <>
      {isCreate ? (
        <ExpenseCreate create={createHandle} />
      ) : (
        <ExpenseForm create={createHandle} addExpense={addExpense} />
      )}
      <div className="expenses">
        <ExpenseFilter onChangeFilter={filterHandle} />
        {renderExpensesList}
        {isFullOfEmptyStrings(renderExpensesList) ? (
          <h2 className="found-result">Found no expenses.</h2>
        ) : null}
      </div>
    </>
  );
}
