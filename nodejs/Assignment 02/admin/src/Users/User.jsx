import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function User() {
  const userData = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 5;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = userData.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(userData.length / itemsPerPage);

  // render hotel list
  const renderUserList = currentItems.map((user) => {
    return (
      <tr key={user._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{user._id}</p>
        </td>
        <td>
          <p>{user.username}</p>
        </td>
        <td>
          <p>{user.password}</p>
        </td>
        <td>
          <p>{user.fullName}</p>
        </td>
        <td>
          <p>{user.phoneNumber}</p>
        </td>
        <td>
          <p>{user.email}</p>
        </td>
        <td>
          <p>{user.isAdmin ? "true" : "false"}</p>
        </td>
        <td>
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
    const newOffset = (event.selected * itemsPerPage) % userData.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Users List</h3>
          <Link className="btn" to={"/add_user"}>
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
                <th style={{ width: "125px" }}>
                  <p>Username</p>
                </th>
                <th style={{ width: "125px" }}>
                  <p>Password</p>
                </th>
                <th style={{ width: "225px" }}>
                  <p>Fullname</p>
                </th>
                <th style={{ width: "120px" }}>
                  <p>Phone</p>
                </th>
                <th>
                  <p>Email</p>
                </th>
                <th>
                  <p>isAdmin</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderUserList}</tbody>
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
