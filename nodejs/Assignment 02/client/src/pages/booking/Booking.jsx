import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";
import UserInfoForm from "./Components/UserInfoForm";
import DateRangeForm from "./Components/DateRangeForm";
import SelectForm from "./Components/SelectForm";
import TotalBill from "./Components/TotalBill";
import isPast from "date-fns/isPast";
import { toast } from "react-toastify";
import { updateCheckBox } from "./util";
// import { formatDate } from "../../util/formatDate";

export default function Booking() {
  const errors = useActionData();
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
  const roomIdsRef = useRef([]);

  function getMap() {
    if (!roomNumberRefs.current) {
      roomNumberRefs.current = new Map();
    }

    return roomNumberRefs.current;
  }

  function onChooseRoom(number, id) {
    const dateGap = Math.abs(
      (dateInput[0].startDate - dateInput[0].endDate) / 86400000
    );

    const map = getMap();
    const node = map.get(number);

    if (node.checked) {
      roomIdsRef.current.push(id);
      setTotal((prev) => prev + node.value * 1 * dateGap);
    } else {
      roomIdsRef.current = roomIdsRef.current.filter((roomId) => roomId !== id);

      setTotal((prev) => prev - node.value * 1 * dateGap);
    }
  }

  const selecDateHandler = (selection) => {
    if (isPast(selection.endDate)) {
      return toast.error("Cannot choose date from the past");
    }

    setDateInput([selection]);
    updateCheckBox(getMap(), selection, hotelData.rooms);

    setTotal(0);
  };

  return (
    <section id="booking">
      <p className="title fsize-l">{hotelData.name}</p>
      <p className="desc">{hotelData.desc}</p>
      <Form method="POST">
        <input type="hidden" name="hotel" defaultValue={hotelData.name} />
        <div className="book-form">
          {/* DateRange */}
          <DateRangeForm
            selecDateHandler={selecDateHandler}
            dateInput={dateInput}
          />
          {/* Reserve Information */}
          <UserInfoForm errors={errors} />
        </div>
        <SelectForm
          typeArr={hotelData.types}
          roomArr={hotelData.rooms}
          onChooseRoom={onChooseRoom}
          map={getMap()}
        />
        <input type="hidden" name="roomIds" value={roomIdsRef.current} />
        <TotalBill total={total} errors={errors} />
      </Form>
    </section>
  );
}
