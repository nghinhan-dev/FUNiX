/* eslint-disable react/prop-types */
import { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export default function FormInputs({ fields, setFormInput }) {
  const renderFields = (obj) => {
    const components = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id" || key === "__v") {
        continue;
      }

      if (key.slice(0, 2) === "is") {
        components.push(
          <InputCheckBox
            key={key}
            value={value}
            name={key}
            setFormInput={setFormInput}
          />
        );
      } else if (typeof value === "object") {
        key === "bookedRange"
          ? components.push(
              <InputDate
                key={key}
                title={key}
                givenArray={value}
                setFormInput={setFormInput}
                name={key}
              />
            )
          : components.push(
              <InputArray
                key={key}
                title={key}
                givenArray={value}
                setFormInput={setFormInput}
                name={key}
              />
            );
      } else {
        components.push(
          <InputText
            key={key}
            value={value}
            name={key}
            setFormInput={setFormInput}
          />
        );
      }
    }

    return components;
  };

  return <div className="form-inputs">{renderFields(fields)}</div>;
}

function InputText({ value, name, setFormInput }) {
  const filledStyle = {
    opacity: "1",
    top: "0%",
  };

  const emptyStyle = {
    top: "24px",
    opacity: "0.7",
  };

  const handleInputChange = (event) => {
    setFormInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <label style={value.length === 0 ? emptyStyle : filledStyle}>
        {name}
      </label>
      <input
        type="text"
        value={value.length === 0 ? "" : value}
        name={name}
        onChange={handleInputChange}
      />
    </div>
  );
}

function InputCheckBox({ value, name, setFormInput }) {
  const handleInputChange = (event) => {
    setFormInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <div className="boolean">
      {name}

      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

function InputArray({ title, givenArray, setFormInput, name }) {
  const [isAdd, setIsAdd] = useState(false);
  const [displayArrray, setDisplayArray] = useState(givenArray);
  const [idForm, setIdForm] = useState("");

  const addToArray = () => {
    setDisplayArray((prevState) => [...prevState, idForm]);
    const newArray = [...displayArrray, idForm];

    setFormInput((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
    setIsAdd(false);
    setIdForm("");
  };

  const removeFromArray = (removeStr) => {
    const newArray = displayArrray.filter((str) => str !== removeStr);

    setDisplayArray(newArray);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
  };

  return (
    <div className="form-array">
      <div className="top-card">
        <p>{title}</p>
        <div className="line"></div>
      </div>
      <ul className="body-card">
        {displayArrray.map((roomTypeId) => {
          return (
            <li key={roomTypeId}>
              <p>{roomTypeId}</p>
              <i
                className="fa-solid fa-circle-minus"
                onClick={() => removeFromArray(roomTypeId)}
              ></i>
            </li>
          );
        })}
        {isAdd ? (
          <li className="addId_form">
            <input type="text" onChange={(e) => setIdForm(e.target.value)} />
            <i onClick={addToArray} className="fa-solid fa-circle-check"></i>
          </li>
        ) : (
          <li onClick={() => setIsAdd(true)}>
            <p>Add new type</p>
          </li>
        )}
      </ul>
    </div>
  );
}

function InputDate({ title, givenArray, setFormInput, name }) {
  const [isAdd, setIsAdd] = useState(false);
  const [displayArrray, setDisplayArray] = useState(givenArray);
  const [rangePick, setRangePick] = useState([new Date(), new Date()]);

  const addToArray = () => {
    setDisplayArray((prevState) => [
      ...prevState,
      {
        startDate: rangePick[0].toISOString(),
        endDate: rangePick[1].toISOString(),
      },
    ]);
    const newArray = [
      ...displayArrray,
      {
        startDate: rangePick[0].toISOString(),
        endDate: rangePick[1].toISOString(),
      },
    ];

    setFormInput((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
    setIsAdd(false);
  };

  const removeFromArray = (index) => {
    const newArray = displayArrray
      .slice(0, index)
      .concat(displayArrray.slice(index + 1));

    setDisplayArray(newArray);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
  };

  const getPickRange = (value) => {
    setRangePick(value);
  };

  return (
    <>
      <div className="form-date">
        <div className="top-card">
          <p>{title}</p>
          <div className="line"></div>
        </div>
        <ul className="body-card">
          {displayArrray.map((dateRange, index) => {
            return (
              <li key={dateRange._id}>
                <p>{`${dateRange.startDate.slice(
                  0,
                  10
                )} to ${dateRange.endDate.slice(0, 10)}`}</p>
                <i
                  className="fa-solid fa-circle-minus"
                  onClick={() => removeFromArray(index)}
                ></i>
              </li>
            );
          })}
          {isAdd ? (
            <li className="addId_form">
              <DateRangePicker
                format="y-MM-dd"
                onChange={getPickRange}
                value={rangePick}
              />
              <i onClick={addToArray} className="fa-solid fa-circle-check"></i>
            </li>
          ) : (
            <li onClick={() => setIsAdd(true)}>
              <p>Add new date</p>
            </li>
          )}
        </ul>
      </div>
      {/* <input className="hidden" name="dateRange" value={displayArrray} /> */}
      <input
        className="hidden"
        name="dateRange"
        value={JSON.stringify(displayArrray)}
      />
    </>
  );
}
