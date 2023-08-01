import { Form, useRouteLoaderData } from "react-router-dom";

export default function Detail() {
  const book = useRouteLoaderData("id");

  return (
    <div className="edit_container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <header>
          <h1>{book.title}</h1>
        </header>
        <hr
          style={{
            height: "2px",
            width: "30%",
            border: "none",
            backgroundColor: "black",
          }}
        />
        <div>
          <img
            className="img"
            src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
            alt="A Book"
          />
        </div>
        <div className="card__content">
          <h2 className="product__price">${book.price}</h2>
          <p
            style={{ marginTop: "10px", fontSize: "20px" }}
            className="product__description"
          >
            {book.description}
          </p>
        </div>
      </div>

      <Form className="edit-form" method="POST">
        <input type="hidden" name="id" value={book._id} />
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            defaultValue={book.title}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="text"
            id="price"
            defaultValue={book.price}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            id="desc"
            defaultValue={book.description}
          ></textarea>
        </div>
        <button className="btn" type="submit">
          Update
        </button>
      </Form>
    </div>
  );
}
