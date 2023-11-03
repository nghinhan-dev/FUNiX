import { Link, useLoaderData, Form } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Hotel() {
  const hotelData = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 6;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = hotelData.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(hotelData.length / itemsPerPage);

  // render hotel list
  const renderHotelList = currentItems.map((hotel) => {
    return (
      <tr key={hotel._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{hotel._id}</p>
        </td>
        <td>
          <p>{hotel.name}</p>
        </td>
        <td>
          <p className="type-col">{hotel.type}</p>
        </td>
        <td>
          <p>{hotel.cheapestPrice}</p>
        </td>
        <td>
          <p>{hotel.city}</p>
        </td>
        <td>
          <Form
            method="DELETE"
            className="form-btn"
            action={`${hotel._id}/delete`}
          >
            <button type="submit" className="btn btn-del">
              Delete
            </button>
          </Form>
          <Link
            to={`/hotel/${hotel._id}`}
            type="button"
            className="btn btn-edit"
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hotelData.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Hotels List</h3>
          <Link className="btn btn-submit" to={"add_hotel"}>
            Add New
          </Link>
        </div>
        <div className="table_container main-shadow">
          <table>
            <thead>
              <tr>
                <th>
                  <i className="fa-regular fa-square"></i>
                </th>
                <th style={{ width: "100px" }}>
                  <p>ID</p>
                </th>
                <th style={{ width: "275px" }}>
                  <p>Name</p>
                </th>
                <th>
                  <p>Type</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th style={{ width: "150px" }}>
                  <p>City</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderHotelList}</tbody>
          </table>
          <div className="pagnigate-container">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              previousLabel="< Prev"
              nextLabel="Next >"
            />
          </div>
        </div>
      </section>
    </>
  );
}
