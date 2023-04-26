import classes from "./TaskItem.module.css";

export default function TaskItem(props) {
  return <li className={classes.task}>{props.children}</li>;
}
