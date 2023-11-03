import { useLoaderData } from "react-router-dom";
import { formatDate } from "../../util/formatDate";

export default function Transactions() {
  const data = useLoaderData();

  const renderTransactions = data.map((trans, index) => {
    return (
      <tr key={trans._id}>
        <td>{`0${index + 1}`}</td>
        <td>{trans.hotel}</td>
        <td>{trans.roomNums.join(",")}</td>
        <td>
          {formatDate(trans.dateStart)} - {formatDate(trans.dateEnd)}
        </td>
        <td>${trans.total}</td>
        <td>{trans.payment}</td>
        <td>
          <span className={`status status-${trans.status.toLowerCase()}`}>
            {trans.status}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <section className="transaction__container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderTransactions}</tbody>
      </table>
    </section>
  );
}
