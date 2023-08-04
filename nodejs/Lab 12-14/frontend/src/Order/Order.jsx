import { useLoaderData } from "react-router-dom";

export default function Order() {
  // Lab 7
  // const { products, totalPrice } = useLoaderData();

  const orders = useLoaderData();

  const renderOrder = orders.map((order) => {
    return (
      <>
        <h3 key={order._id}>Order #{order._id}</h3>
        {order.items.map((item) => {
          return (
            <>
              <div key={item._id} className="item_container">
                <div className="item_container">
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  });

  return (
    <>
      {orders.length !== 0 ? renderOrder : <h1>Empty cart!</h1>}
      {/* <h5>Total Price : {totalPrice}</h5> */}
      {/* <Link to={"/checkout"}>Check Out</Link> */}
    </>
  );
}
