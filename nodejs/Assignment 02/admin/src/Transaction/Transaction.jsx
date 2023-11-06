import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { formatDateFormAPI } from "../util/timeZone";
import ReactPaginate from "react-paginate";

export default function Transaction() {
  const trans = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 5;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = trans.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(trans.length / itemsPerPage);

  // render hotel list
  const renderTransList = currentItems.map((trans) => {
    return (
      <tr key={trans._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{trans._id}</p>
        </td>
        <td>
          <p>{trans.user}</p>
        </td>
        <td>
          <p className="id-col">{trans.hotel}</p>
        </td>
        <td>
          <p>
            {`${formatDateFormAPI(trans.dateStart)} -  ${formatDateFormAPI(
              trans.dateEnd
            )}`}
          </p>
        </td>
        <td>
          <p>{trans.roomNums.join(",")}</p>
        </td>
        <td>
          <p>{trans.payment}</p>
        </td>
        <td>
          <p className={`status status-${trans.status.toLowerCase()}`}>
            {trans.status}
          </p>
        </td>
      </tr>
    );
  });

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % trans.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Transactions List</h3>
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
                <th style={{ width: "100px" }}>
                  <p>Username</p>
                </th>
                <th style={{ width: "100px" }}>
                  <p>Hotel</p>
                </th>
                <th>
                  <p>Date (mm/dd) </p>
                </th>
                <th>
                  <p>Rooms</p>
                </th>
                <th>
                  <p>Payment</p>
                </th>
                <th>
                  <p>Status</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderTransList}</tbody>
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
