import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useActionData, useLoaderData } from "react-router-dom";
import { toastSuccess } from "../../util/toast";

export default function TypeRoom() {
  const typeRoomData = useLoaderData();
  const notify = useActionData();

  useEffect(() => {
    notify?.success && toastSuccess(`${notify.success.statusText}`);
  }, [notify]);

  const missingFieldsData = typeRoomData.filter((type) => {
    if (type.desc === "") {
      return type;
    }
  });

  const [pageOffSet, setPageOffSet] = useState(0);
  const [isShowMissingFields, setIsShowMissingFields] = useState(false);

  // make 6 per page is default
  const itemsPerPage = 5;

  const endOffSet = pageOffSet + itemsPerPage;
  let currentItems = isShowMissingFields
    ? missingFieldsData.slice(pageOffSet, endOffSet)
    : typeRoomData.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(typeRoomData.length / itemsPerPage);

  // render hotel list
  const renderTypeRoomList = currentItems.map((type) => {
    return (
      <tr key={type._id}>
        <td>
          <i className="fa-regular fa-square"></i>
        </td>
        <td>
          <p className="id-col">{type._id}</p>
        </td>
        <td>
          <p>{type.title}</p>
        </td>
        <td>
          <p>{type?.desc}</p>
        </td>
        <td>
          <p className="type-col">{type?.price}</p>
        </td>
        <td style={{ textAlign: "center" }}>
          <p>{type?.maxPeople}</p>
        </td>
        <td>
          <p>{type?.updatedAt?.slice(0, 10)}</p>
        </td>
        <td style={{ textAlign: "center" }}>
          <button type="button" className="btn btn-del">
            Delete
          </button>
          <Link to={`${type._id}`} type="button" className="btn btn-edit">
            Edit
          </Link>
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
          <div>
            <button
              onClick={() => setIsShowMissingFields((prevState) => !prevState)}
              className="btn btn-submit"
            >
              {`${isShowMissingFields ? "Show Data" : "Show Missing Data"}`}
            </button>
            <Link className="btn btn-submit" to={"add_roomType"}>
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
