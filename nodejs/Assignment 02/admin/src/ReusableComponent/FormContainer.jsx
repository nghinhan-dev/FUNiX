/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";

export default function FormContainer({ title, children }) {
  return (
    <section id="render_data">
      <Form method="POST">
        <div className="header">
          <h3>Add {title}</h3>
          <button className="btn btn-add" type="submit">
            Submit
          </button>
        </div>
        <div className="add-form-container">{children}</div>
      </Form>
    </section>
  );
}
