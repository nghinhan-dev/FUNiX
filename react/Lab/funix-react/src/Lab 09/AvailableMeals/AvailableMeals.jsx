import { useState } from "react";
import mealsData from "/data/meals.js";
import Dish from "./Dish";

export default function AvailableMeals() {
  const [hoveredImage, setHoveredImage] = useState("");

  let renderMeal = mealsData.map((dish) => {
    return (
      <Dish
        dish={dish}
        key={dish.id}
        hoverDish={() => changeImage(dish.image_url)}
      />
    );
  });

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
        <div onMouseLeave={() => leaveMenu()} className="meal__list">
          {renderMeal}
        </div>
      </div>
    </div>
  );

  function changeImage(url) {
    setHoveredImage(url);
  }

  function leaveMenu() {
    setHoveredImage("");
  }
}
