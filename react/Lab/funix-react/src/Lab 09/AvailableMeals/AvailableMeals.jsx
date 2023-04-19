import { useState } from "react";
import mealsData from "/data/meals.js";
import { useForm } from "react-hook-form";

export default function AvailableMeals() {
  const { register, handleSubmit } = useForm({});
  const [hoveredImage, setHoveredImage] = useState("");

  const onSubmit = (data) => {
    console.log("data:", data);
  };

  let renderMeal = mealsData.map((dish) => {
    return (
      <div
        className="row meal__item"
        onMouseEnter={() => changeImage(dish.image_url)}
        key={dish.id}
      >
        <div className="meal__info">
          <p>
            <strong>{dish.name}</strong>
          </p>
          <p className="desc">
            <em>{dish.name}</em>
          </p>
          <h3>${dish.price}</h3>
        </div>

        <div className="meal__form">
          <div>
            <label htmlFor={`${dish.name}`}>Amount</label>
            <input
              type="number"
              placeholder="1"
              defaultValue={1}
              {...register(`${dish.name}`, { required: true })}
            />
          </div>
          <button type="submit">
            <i className="fa fa-plus"> Add</i>
          </button>
        </div>
      </div>
    );
  });

  function changeImage(url) {
    setHoveredImage(url);
  }

  function leaveMenu() {
    console.log("did leave");
    setHoveredImage("");
  }

  return (
    <div className="container avaiMeal ">
      <div className="grid">
        <div className="meal__img">
          {hoveredImage !== "" ? (
            <img src={`${hoveredImage}`} alt="" />
          ) : (
            <p>Hover on Menu</p>
          )}
        </div>
        <form
          onMouseLeave={() => leaveMenu()}
          onSubmit={handleSubmit(onSubmit)}
          className="meal__list"
        >
          {renderMeal}
        </form>
      </div>
    </div>
  );
}
