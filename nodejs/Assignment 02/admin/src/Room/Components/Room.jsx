import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData, Form } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Room() {
  const roomData = useLoaderData();

  const missingFieldsData = roomData.filter((room) => {
    if (room.bookedRange.length === 0) {
      return room;
    }
  });

  const [pageOffSet, setPageOffSet] = useState(0);
  const [isShowMissingFields, setIsShowMissingFields] = useState(false);

  // make 6 per page is default
  const itemsPerPage = 6;

  const endOffSet = pageOffSet + itemsPerPage;
  let currentItems = isShowMissingFields
    ? missingFieldsData.slice(pageOffSet, endOffSet)
    : roomData.slice(pageOffSet, endOffSet);

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
          <Form
            method="DELETE"
            className="form-btn"
            action={`${room._id}/delete`}
          >
            <button type="submit" className="btn btn-del">
              Delete
            </button>
          </Form>
          <Link to={`/room/${room._id}`} type="button" className="btn btn-edit">
            Edit
          </Link>
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
          <div>
            <button
              onClick={() => setIsShowMissingFields((prevState) => !prevState)}
              className="btn btn-submit"
            >
              {`${isShowMissingFields ? "Show Data" : "Show Missing Data"}`}
            </button>

            <Link className="btn btn-submit" to={"/add_room"}>
              Add New
            </Link>
          </div>
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
                <th style={{ width: "100px" }}>
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
      <ToastContainer />
    </>
  );
}
