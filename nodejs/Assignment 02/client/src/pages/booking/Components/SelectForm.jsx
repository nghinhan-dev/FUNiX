import React from "react";

export default function SelectForm({ typeArr, roomArr, map, onChooseRoom }) {
  function renderRoomNumCheckbox(roomIds, roomArr, map, price) {
    return roomIds.map((id) => {
      const roomIndex = roomArr.findIndex((room) => room._id === id);

      return (
        <label key={id}>
          {roomArr[roomIndex].number}
          <input
            ref={(node) => {
              if (node) {
                map.set(roomArr[roomIndex].number, node);
              } else {
                map.delete(roomArr[roomIndex].number);
              }
            }}
            type="checkbox"
            disabled={false}
            value={price}
            onChange={() => onChooseRoom(roomArr[roomIndex].number, id)}
          />
        </label>
      );
    });
  }

  function renderTypes(typeArr, roomArr, map) {
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
            {renderRoomNumCheckbox(type.roomIds, roomArr, map, type.price)}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="select-rooms">
      <p className="title">Select Rooms</p>
      <div className="select_container">
        {renderTypes(typeArr, roomArr, map)}
      </div>
    </div>
  );
}
