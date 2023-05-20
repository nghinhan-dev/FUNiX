import { useRouteLoaderData } from "react-router-dom";
import ProductList from "../../Shared/ProductList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useState, useDeferredValue, Suspense } from "react";

export default function ShopNav() {
  const data = useRouteLoaderData("root");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [sortStyle, setSortStyle] = useState("default");

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col className="ps-1" md="3" xl="3">
            <h4 className="text-uppercase fw-bold">categories</h4>
            <Nav
              id="shopNav"
              defaultActiveKey={"#all"}
              className="d-flex flex-column"
            >
              <p className="text-uppercase fs-5 bg-black text-white">apple</p>
              <Nav.Link onClick={() => setCategory("all")} eventKey="#all">
                All
              </Nav.Link>
              <p className="text-uppercase bg-light fw-bold">iphone & mac</p>
              <Nav.Link onClick={() => setCategory("iphone")}>iPhone</Nav.Link>
              <Nav.Link onClick={() => setCategory("ipad")}>iPad</Nav.Link>
              <Nav.Link onClick={() => setCategory("macbook")}>
                Macbook
              </Nav.Link>
              <p className="text-uppercase bg-light fw-bold">wireless</p>
              <Nav.Link onClick={() => setCategory("airpod")}>Airpod</Nav.Link>
              <Nav.Link onClick={() => setCategory("watch")}>Watch</Nav.Link>
              <p className="text-uppercase bg-light fw-bold">other</p>
              <Nav.Link onClick={() => setCategory("mouse")}>Mouse</Nav.Link>
              <Nav.Link onClick={() => setCategory("keyboard")}>
                Keyboard
              </Nav.Link>
              <Nav.Link onClick={() => setCategory("other")}>Other</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Row
              id="dummy-sort"
              className="align-items-center justify-content-between pb-5"
            >
              <label htmlFor="search">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ padding: "10px" }}
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Enter your search..."
                />
              </label>
              <label htmlFor="sortList">
                <select
                  onChange={(e) => setSortStyle(e.target.value)}
                  name="sort"
                  id="sortList"
                >
                  <option value="default">Default</option>
                  <option value="asc">Lowest price to higher</option>
                  <option value="dsc">Highest price to lower</option>
                </select>
              </label>
            </Row>
            <Suspense fallback={<h2>Loading...</h2>}>
              <ProductList
                data={data}
                cate={category}
                search={deferredQuery}
                sortStyle={sortStyle}
              />
            </Suspense>
          </Col>
        </Row>
      </Container>
    </>
  );
}
