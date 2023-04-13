import React from "react";

import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";

export default function CourseGoalList(props) {
  return (
    <ul className="goal-list">
      {props.items.map((goal) => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          onDelete={props.onDeleteItem}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
}
