/* eslint-disable react/prop-types */
import classes from "./QuoteList.module.css";
import { useLoaderData, Link } from "react-router-dom";

export default function QuoteList() {
  const data = useLoaderData();

  return (
    <div className={classes.main}>
      <ul className={classes.list}>
        {data.map((quote) => {
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
