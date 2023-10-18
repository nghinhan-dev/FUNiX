import { Form, useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";
import UserInfoForm from "./Components/UserInfoForm";
import DateRangeForm from "./Components/DateRangeForm";
import SelectForm from "./Components/SelectForm";
import TotalBill from "./Components/TotalBill";
// import { formatDate } from "../../util/formatDate";

export default function Booking() {
  const [hotelData] = useLoaderData();
  const [dateInput, setDateInput] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [total, setTotal] = useState(0);
  const roomNumberRefs = useRef(null);

  function getMap() {
    if (!roomNumberRefs.current) {
      roomNumberRefs.current = new Map();
    }

    return roomNumberRefs.current;
  }

  function onChooseRoom(number) {
    const dateGap = Math.abs(
      (dateInput[0].startDate - dateInput[0].endDate) / 86400000
    );
    console.log("dateGap:", dateGap);

    const map = getMap();
    const node = map.get(number);

    if (node.checked) {
      setTotal((prev) => prev + node.value * 1 * dateGap);
    } else {
      setTotal((prev) => prev - node.value * 1 * dateGap);
    }
  }

  const selecDateHandler = (selection) => {
    setDateInput([selection]);
    setTotal(0);
  };

  return (
    <section id="booking">
      <p className="title fsize-l">{hotelData.name}</p>
      <p className="desc">{hotelData.desc}</p>
      <Form method="POST">
        <div className="book-form">
          {/* DateRange */}
          <DateRangeForm
            selecDateHandler={selecDateHandler}
            checkArray={hotelData.rooms}
            dateInput={dateInput}
            mapItems={getMap()}
          />
          {/* Reserve Information */}
          <UserInfoForm />
        </div>
        <SelectForm
          typeArr={hotelData.types}
          roomArr={hotelData.rooms}
          onChooseRoom={onChooseRoom}
          map={getMap()}
        />
        <TotalBill total={total} />
      </Form>
    </section>
  );
}
