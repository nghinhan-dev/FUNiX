import { useLoaderData } from "react-router-dom";

export default function Shop() {
  const bookList = useLoaderData();

  const renderBookList = bookList.map((book) => {
    return (
      <article key={book.title} className="card product-item">
        <header className="card__header">
          <h1 className="product__title">{book.title}</h1>
        </header>
        <div className="card__image">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
            alt="A Book"
          />
        </div>
        <div className="card__content">
          <h2 className="product__price">${book.price}</h2>
          <p className="product__description">{book.desc}</p>
        </div>
        <div className="card__actions">
          <button className="btn">Add to Cart</button>
        </div>
      </article>
    );
  });

  return (
    <>
      <main>
        <h1>My Products</h1>
        <div className="grid">{renderBookList}</div>
      </main>
    </>
  );
}
