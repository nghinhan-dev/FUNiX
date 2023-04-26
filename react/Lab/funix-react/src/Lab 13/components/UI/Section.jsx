import classes from "./Section.module.css";

export default function Section(props) {
  return <section className={classes.section}>{props.children}</section>;
}
