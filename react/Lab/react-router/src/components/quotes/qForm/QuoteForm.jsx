import { useRef } from "react";
import Card from "../../UI/Card";
import classes from "./QuoteForm.module.css";

export default function QuoteForm() {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    console.log("enteredAuthor:", enteredAuthor);
    const enteredText = textInputRef.current.value;
    console.log("enteredText:", enteredText);

    // optional: Could validate here
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea id="text" rows="5" ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className="btn">Add Quote</button>
        </div>
      </form>
    </Card>
  );
}
