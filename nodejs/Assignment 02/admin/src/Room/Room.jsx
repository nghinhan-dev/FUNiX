import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData } from "react-router-dom";

export default function RRoom() {
  const roomData = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 6;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = roomData.slice(pageOffSet, endOffSet);

  const pageCount = Math.ceil(roomData.length / itemsPerPage);

  // render hotel list
  const renderRoomList = currentItems.map((room) => {
    return (
      <tr key={room._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{room._id}</p>
        </td>

        <td>
          <p>{room.number}</p>
        </td>
        <td>
          <p>
            {room.bookedRange.reduce((acc, range) => {
              return (
                acc +
                `[${range.startDate.slice(5, 10)} to ${range.endDate.slice(
                  5,
                  10
                )}], `
              );
            }, "")}
          </p>
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
    const newOffset = (event.selected * itemsPerPage) % roomData.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Rooms List</h3>
          <Link className="btn" to={"/add_room"}>
            Add New
          </Link>
        </div>
        <div className="table_container">
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
                  <p>Number</p>
                </th>
                <th style={{ width: "590px" }}>
                  <p>Booked Range</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderRoomList}</tbody>
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
