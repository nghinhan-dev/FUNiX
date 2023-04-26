import React, { useContext, useState } from "react";
import { CartDispatchContext } from "../Context/CartContext";

export default function Dish({ dish, hoverDish }) {
  const dispatch = useContext(CartDispatchContext);
  const [dishState, setDishState] = useState({ ...dish, amount: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD",
      item: dishState,
    });
  };

  const handleChange = (e) => {
    setDishState({
      ...dishState,
      amount: e.target.value * 1,
    });
  };

  return (
    <div className="row meal__item" onMouseEnter={hoverDish} key={dish.id}>
      <div className="meal__info">
        <p>
          <strong>{dish.name}</strong>
        </p>
        <p className="desc">
          <em>{dish.name}</em>
        </p>
        <h3>${dish.price}</h3>
      </div>

      <form onSubmit={handleSubmit} className="meal__form">
        <div>
          <label htmlFor={`${dish.name}`}>Amount</label>
          <input
            onChange={handleChange}
            type="number"
            name={`${dish.name}`}
            placeholder="1"
            min={1}
          />
        </div>
        <button type="submit">
          <i className="fa fa-plus"> Add</i>
        </button>
      </form>
    </div>
  );
}
