/* eslint-disable react/prop-types */
import classes from "./QuoteList.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";

export default function QuoteList() {
  const data = useRouteLoaderData("all-quote");

  return (
    <div className={classes.main}>
      <ul className={classes.list}>
        {Object.values(data).map((quote) => {
          return (
            <li key={quote.id} className={classes.item}>
              <figure>
                <blockquote>
                  <p>{quote.content}</p>
                </blockquote>
              </figure>
              <Link className="btn" to={`/${quote.id}`}>
                View Fullscreen
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
