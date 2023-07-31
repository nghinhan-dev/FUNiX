import { Form } from "react-router-dom";

export default function AddProduct() {
  return (
    <>
      <main>
        <Form className="product-form" method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" />
            <label htmlFor="desc">Description</label>
            <textarea type="text" name="desc" id="desc"></textarea>
          </div>
          <button className="btn" type="submit">
            Add Product
          </button>
        </Form>
      </main>
    </>
  );
}
