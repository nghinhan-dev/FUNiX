import { useLoaderData, Link, Form } from "react-router-dom";

export default function Shop() {
  const bookList = useLoaderData();

  const renderBookList = bookList.map((book) => {
    return (
      <article key={book.title} className="card product-item">
        <header className="card__header">
          <h1 className="product__title">{book.title}</h1>
        </header>

        <img
          className="img"
          src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
          alt="A Book"
        />

        <div className="card__content">
          <h2 className="product__price">${book.price}</h2>
          <p className="product__description">{book.desc}</p>
        </div>
        <div className="card__actions">
          <button className="btn">
            <Link to={`/${book._id}`}>Detail</Link>
          </button>

          <Form style={{ display: "inline" }} method="POST">
            <input type="hidden" name="id" value={book._id} />
            <input type="hidden" name="title" value={book.title} />
            <input type="hidden" name="price" value={book.price} />
            <button type="submit" className="btn" name="intent" value="add">
              Add to Cart
            </button>
          </Form>
        </div>
      </article>
    );
  });

  return (
    <>
      <main>
        <h1>My Products</h1>
        <div className="grid">
          {bookList.length > 0 ? renderBookList : <h1>No books found</h1>}
        </div>
      </main>
    </>
  );
}
