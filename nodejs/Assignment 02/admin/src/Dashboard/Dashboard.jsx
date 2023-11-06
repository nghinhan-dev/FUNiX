import { Link, useLoaderData } from "react-router-dom";
import { formatDateFormAPI } from "../util/timeZone";

export default function Dashboard() {
  const trans = useLoaderData();
  const recentTrans = trans.slice(trans.length - 8, trans.length);

  // render hotel list
  const renderTransList = recentTrans.map((trans) => {
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
          <p>{trans.status}</p>
        </td>
        <td>
          <button type="button" className="btn btn-del">
            Delete
          </button>
          <Link to={`${trans._id}`} className="btn btn-edit">
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  // Invoke when user click to request another page.

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Recent Transaction</h3>
          <Link className="btn btn-submit" to={"add_user"}>
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
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderTransList}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
