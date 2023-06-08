export default function AddProduct() {
  return (
    <>
      <main>
        <form
          className="product-form"
          action="/admin/add-product"
          method="POST"
        >
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <button className="btn" type="submit">
            Add Product
          </button>
        </form>
      </main>
    </>
  );
}
