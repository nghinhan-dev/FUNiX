import { useLoaderData, Form, useFetcher } from "react-router-dom";

export default function Cart() {
  // Lab 7
  // const { products, totalPrice } = useLoaderData();
  const fetcher = useFetcher();
  const { items, total } = useLoaderData();

  const renderCart = items.map((book) => {
    return (
      <>
        <div key={book._id} className="item_container">
          <div className="item_container">
            <p>{book.title}</p>
            <p>Quantity: {book.quantity}</p>
          </div>
          <fetcher.Form style={{ display: "inline" }} method="POST">
            <input type="hidden" name="id" value={book._id} />
            <input type="hidden" name="title" value={book.title} />
            <input type="hidden" name="price" value={book.price} />

            <button type="submit" className="btn" name="intent" value="del">
              Delete
            </button>
          </fetcher.Form>
        </div>
      </>
    );
  });

  return (
    <>
      {items.length !== 0 ? renderCart : <h1>Empty cart!</h1>}
      <h5>Total Price : {total}</h5>
      <Form style={{ display: "inline" }} method="POST">
        <button
          type="submit"
          className="btn"
          name="intent"
          value="create-order"
        >
          Order
        </button>
      </Form>
    </>
  );
}
