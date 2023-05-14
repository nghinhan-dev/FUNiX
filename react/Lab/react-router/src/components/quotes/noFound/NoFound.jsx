import classes from "./NoFound.module.css";
import { Link } from "react-router-dom";

const NoFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to={`add`} className="btn">
        Add a Quote
      </Link>
    </div>
  );
};

export default NoFound;
