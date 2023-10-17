import { useLoaderData } from "react-router-dom";
import { DateRange } from "react-date-range";
import { useRef, useState } from "react";
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

  let bookRange = dateInput;

  const roomNumberRefs = useRef(null);

  function getMap() {
    if (!roomNumberRefs.current) {
      roomNumberRefs.current = new Map();
    }

    return roomNumberRefs.current;
  }

  function renderRoomNumCheckbox(roomIds, roomArr) {
    return roomIds.map((id) => {
      const roomIndex = roomArr.findIndex((room) => room._id === id);

      return (
        <label key={id}>
          {roomArr[roomIndex].number}
          <input
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(roomArr[roomIndex].number, node);
              } else {
                map.delete(roomArr[roomIndex].number);
              }
            }}
            type="checkbox"
            disabled={false}
          />
        </label>
      );
    });
  }

  function renderTypes(typeArr, roomArr) {
    return typeArr.map((type) => {
      return (
        <div key={type._id} className="type_card">
          <div className="type_info">
            <p className="type_name">{type.title}</p>
            <p className="desc">{type.desc}</p>
            <p>
              Max people : <span>{type.maxPeople}</span>
            </p>
            <p>
              <span>${type.price}</span>
            </p>
          </div>
          <div className="type_number">
            {renderRoomNumCheckbox(type.roomIds, roomArr)}
          </div>
        </div>
      );
    });
  }

  const selecDateHandler = (selection) => {
    bookRange = selection;
    setDateInput([selection]);
  };

  return (
    <section id="booking">
      <p className="title fsize-l">{hotelData.name}</p>
      <p className="desc">{hotelData.desc}</p>
      <form>
        <div className="book-form">
          <div className="date_range">
            <p className="title">Date</p>
            <DateRange
              className="bookingCalendar"
              editableDateInputs={true}
              onChange={(item) => selecDateHandler(item.selection)}
              onRangeFocusChange={(range) => {
                updateCheckBox(range, getMap(), bookRange, hotelData.rooms);
              }}
              ranges={dateInput}
            />
          </div>
          <div className="info-container">
            <p className="title">Reserve Information</p>
            <div className="info-form">
              <label>
                Your Full Name:
                <input type="text" name="fullName" />
              </label>
              <label>
                Your Email:
                <input type="email" name="email" />
              </label>
              <label>
                Your Phone Number:
                <input type="number" name="phoneNumber" />
              </label>
              <label>
                Your Identify Card Number:
                <input type="number" name="identifyNumber" />
              </label>
            </div>
          </div>
        </div>
        <div className="select-rooms">
          <p className="title">Select Rooms</p>
          <div className="select_container">
            {renderTypes(hotelData.types, hotelData.rooms)}
          </div>
        </div>
      </form>
    </section>
  );
}

function totalBill(total) {}

function unCheck(key, value) {
  return (key.checked = false);
}

function unDisabled(key, value) {
  return (key.disabled = false);
}

function validateDateRange(map, selection, rooms) {
  // key = input
  // value = number

  for (const room of rooms) {
    for (const { startDate, endDate } of room.bookedRange) {
      const currentStart = new Date(startDate);
      const currentEnd = new Date(endDate);

      if (
        !(
          selection.startDate >= currentEnd || selection.endDate <= currentStart
        )
      ) {
        const numberRoom = room.number;
        const node = map.get(numberRoom);
        node.disabled = true;
      }
    }
  }
}

function updateCheckBox(range, map, selection, rooms) {
  if (JSON.stringify(range) === JSON.stringify([0, 0])) {
    map.forEach(unCheck);
    map.forEach(unDisabled);
    validateDateRange(map, selection, rooms);
  }
}
