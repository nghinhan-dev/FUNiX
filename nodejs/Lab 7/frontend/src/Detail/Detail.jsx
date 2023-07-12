import { useRouteLoaderData, Link, Form } from "react-router-dom";

export default function Detail() {
  const book = useRouteLoaderData("id");

  return (
    <Form method="POST">
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

        <button className="btn">
          <Link to={`edit`}>Edit</Link>
        </button>
        <button type="submit">Delete</button>
      </div>
    </Form>
  );
}
