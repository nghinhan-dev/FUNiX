import { useLoaderData } from "react-router-dom";

export default function Order() {
  // Lab 7
  // const { products, totalPrice } = useLoaderData();

  const orders = useLoaderData();
  console.log("orders:", orders);

  const renderCart = orders.map((book) => {
    return (
      <>
        <div key={book.id} className="item_container">
          <div className="item_container">
            <p>{book.title}</p>
            <p>Quantity: {book.cartItem.quantity}</p>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {orders.length !== 0 ? renderCart : <h1>Empty cart!</h1>}
      {/* <h5>Total Price : {totalPrice}</h5> */}
      {/* <Link to={"/checkout"}>Check Out</Link> */}
    </>
  );
}
