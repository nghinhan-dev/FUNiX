import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData } from "react-router-dom";

export default function TypeRoom() {
  const typeRoomData = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 6;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = typeRoomData.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(typeRoomData.length / itemsPerPage);

  // render hotel list
  const renderTypeRoomList = currentItems.map((hotel) => {
    return (
      <tr key={hotel._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{hotel._id}</p>
        </td>
        <td>
          <p>{hotel.title}</p>
        </td>
        <td>
          <p>{hotel.desc}</p>
        </td>
        <td>
          <p className="type-col">{hotel.price}</p>
        </td>
        <td style={{ textAlign: "center" }}>
          <p>{hotel.maxPeople}</p>
        </td>
        <td>
          <p>{hotel.updatedAt.slice(0, 10)}</p>
        </td>
        <td style={{ textAlign: "center" }}>
          <button type="button" className="btn btn-del">
            Delete
          </button>
          <button type="button" className="btn btn-edit">
            Edit
          </button>
        </td>
      </tr>
    );
  });

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % typeRoomData.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Type of Rooms List</h3>
          <Link className="btn" to={"/add_typeRoom"}>
            Add New
          </Link>
        </div>
        <div className="table_container main-shadow">
          <table className="type_room_table">
            <thead>
              <tr>
                <th>
                  <i className="fa-regular fa-square"></i>
                </th>
                <th style={{ width: "100px" }}>
                  <p>ID</p>
                </th>
                <th style={{ width: "190px" }}>
                  <p>Title</p>
                </th>
                <th style={{ width: "375px" }}>
                  <p>Describe</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th>
                  <p>People</p>
                </th>
                <th>
                  <p>Updated</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderTypeRoomList}</tbody>
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
