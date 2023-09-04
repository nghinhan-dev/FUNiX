import { Link, useLoaderData } from "react-router-dom";

export default function Hotel() {
  const hotelData = useLoaderData();

  // render hotel list
  const renderHotelList = hotelData.map((hotel) => {
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
          <p>{hotel.title}</p>
        </td>
        <td>
          <p>{hotel.city}</p>
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

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Hotels List</h3>
          <Link className="btn" to={"/add_hotel"}>
            Add New
          </Link>
        </div>
        <div className="hotel_table">
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
                <th style={{ width: "275px" }}>
                  <p>Title</p>
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
        </div>
      </section>
    </>
  );
}
