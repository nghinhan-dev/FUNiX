/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { memo } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = memo(function ProductList({
  data,
  cate,
  sortStyle = "default",
  search = "",
}) {
  const navigate = useNavigate();
  const [dialogData, setDialogData] = useState([0]);
  const dialogRef = useRef(null);
  let productList;

  if (cate === "trending") {
    productList = data.slice(0, 8);
  } else if (cate === "all") {
    productList = data;
  } else {
    productList = data.filter((item) => item.category === cate);
  }

  if (search !== "") {
    productList = productList.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
  }

  if (sortStyle !== "default") {
    productList =
      sortStyle === "asc"
        ? productList.sort((a, b) => a.price - b.price)
        : productList.sort((a, b) => b.price - a.price);
  }

  const showDialog = (id) => {
    const logData = data.filter((item) => item._id.$oid === id);
    setDialogData(logData);
    dialogRef.current.showModal();
  };

  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const renderProductList = productList.map((item) => {
    return (
      <CartHolder
        key={item._id.$oid}
        id={item._id.$oid}
        image={item.img1}
        name={item.name}
        price={item.price}
        handleClick={cate === "trending" ? showDialog : navigateToDetail}
      />
    );
  });

  return (
    <>
      <Row style={{ gap: "0px" }}>{renderProductList}</Row>
      {cate === "trending" && <Dialog data={dialogData} ref={dialogRef} />}
    </>
  );
});

export default ProductList;

function CartHolder({ id, name, price, image, handleClick }) {
  return (
    <>
      <Col onClick={() => handleClick(id)} xl={3}>
        <Card className="text-center">
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Text className="fw-bold">{name}</Card.Text>
            <Card.Text>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const Dialog = forwardRef(function Dialog(props, ref) {
  const data = props.data[0];

  return (
    <>
      <dialog className="container" ref={ref} id="favDialog">
        <form>
          <i
            onClick={() => ref.current.close()}
            className="icon-exit fa-solid fa-xmark"
          ></i>
          <Row>
            <Col>
              <img className="img-fluid" src={data?.img1} alt="" />
            </Col>
            <Col className="d-flex flex-column justify-content-center p-3">
              <p className="fw-bold">{data?.name}</p>
              <p className="p-4">{data?.short_desc}</p>
              <button
                className="btn bg-black text-white"
                style={{ width: "fit-content" }}
                id="confirmBtn"
                value="default"
              >
                <i className="fa-solid fa-cart-shopping pe-1"></i>
                View Detail
              </button>
            </Col>
          </Row>
        </form>
      </dialog>
    </>
  );
});
