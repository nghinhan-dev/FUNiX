import { useLoaderData, Form } from "react-router-dom";

export default function Cart() {
  const { products, totalPrice } = useLoaderData();

  const renderCart = products.map((book) => {
    return (
      <>
        <div key={book.id} className="item_container">
          <div className="item_container">
            <p>{book.title}</p>
            <p>Qty: {book.qty}</p>
          </div>
          <Form style={{ display: "inline" }} method="POST">
            <input type="hidden" name="id" value={book.id} />
            <input type="hidden" name="title" value={book.title} />
            <input type="hidden" name="price" value={book.price} />

            <button type="submit" className="btn" name="intent" value="del">
              Delete
            </button>
          </Form>
        </div>
      </>
    );
  });

  return (
    <>
      {products.length !== 0 ? renderCart : <h1>Empty cart!</h1>}
      <h5>Total Price : {totalPrice}</h5>
    </>
  );
}
