import { Form, useActionData } from "react-router-dom";

export default function AddProduct() {
  const errors = useActionData();

  return (
    <>
      <main>
        <Form className="product-form" method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {errors?.title && <span className="errorMsg">{errors.title}</span>}
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" />
            {errors?.price && <span className="errorMsg">{errors.price}</span>}
            <label htmlFor="desc">Description</label>
            <textarea type="text" name="desc" id="desc"></textarea>
            {errors?.description && (
              <span className="errorMsg">{errors.description}</span>
            )}
          </div>
          <button className="btn" type="submit">
            Add Product
          </button>
        </Form>
      </main>
    </>
  );
}
