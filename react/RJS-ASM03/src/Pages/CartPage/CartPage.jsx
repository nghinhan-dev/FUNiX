import { useSelector } from "react-redux";
import { useRef } from "react";
// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
// shared component
import OtherBanner from "../../Shared/OtherBanner";

export default function CartPage() {
  const { items: cartList, totalPrice } = useSelector((state) => state.cart);
  const couponRef = useRef();

  const renderCartList = cartList.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <img className="img-table" src={item.img1} alt={`${item.name}.jpg`} />
        </td>
        <td>{item.name}</td>
        <td>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
        </td>
        <td>
          <div className="px-3 d-flex align-items-center">
            <i className="fa-solid fa-chevron-left"></i>
            <p className="px-2">{item.quantity}</p>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </td>
        <td>
          {(item.quantity * item.price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
          VND
        </td>
        <td>
          <i className="fa-solid fa-trash-can"></i>
        </td>
      </tr>
    );
  });

  return (
    <>
      <OtherBanner bigTitle={"CART"} smallTitle={"CART"} />
      {/* cart UI */}
      <Container className="py-4">
        <Row className="flex-nowrap">
          {/* cart detail */}
          <Col md="8" xl="8">
            <Table id="cartTable" striped className="align-middle">
              <thead className="text-uppercase">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>{renderCartList}</tbody>
            </Table>
          </Col>
          {/* cart total */}
          <Col md="4" xl="4">
            <div className="bg-light text-uppercase p-4">
              <h3 className="mb-3">CART TOTAL</h3>
              <div className="d-flex align-items-center justify-content-between">
                <h5>subtotal</h5>
                <p className="price opacity-75">
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VND
                </p>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <h5>total</h5>
                <p className="price">
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VND
                </p>
              </div>
              <input
                className="py-2 ps-3 w-100 mt-3"
                type="text"
                placeholder="Enter your coupon"
                ref={couponRef}
              />
              <button className="py-2 w-100 bg-black text-white">
                <i className="fa-solid fa-gift me-2"></i>
                Apply coupon
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
