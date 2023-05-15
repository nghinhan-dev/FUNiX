import Card from "../../UI/Card";
import classes from "./QuoteForm.module.css";
import { Form, useActionData, useRouteLoaderData } from "react-router-dom";

export default function QuoteForm() {
  const errors = useActionData();
  const loadedData = useRouteLoaderData("all-quote");

  return (
    <Card>
      <Form method="POST" className={classes.form}>
        <input
          style={{ display: "none" }}
          type="text"
          name="id"
          defaultValue={`q${loadedData.length + 1}`}
        />
        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" defaultValue={""} />
          {errors?.author && <p style={{ color: "red" }}>{errors.author}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            rows="5"
            name="content"
            defaultValue={""}
          ></textarea>
          {errors?.content && <p style={{ color: "red" }}>{errors.content}</p>}
        </div>

        <div className={classes.actions}>
          <button className="btn">Add Quote</button>
        </div>
      </Form>
    </Card>
  );
}
