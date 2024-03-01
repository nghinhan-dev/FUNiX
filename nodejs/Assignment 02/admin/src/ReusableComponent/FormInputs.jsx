/* eslint-disable react/prop-types */
import { useState } from "react";
import { toastError } from "../util/toast";
import { deleteInEditPage } from "../util/sweetAlert";
import { formattedDateInTimeZone, formatDateFormAPI } from "../util/timeZone";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Link } from "react-router-dom";

export default function FormInputs({ isEdit, fields, setFormInput }) {
  const renderFields = (obj) => {
    const components = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id" || key === "__v") {
        continue;
      }

      if (key.slice(0, 2) === "is" || key === "featured") {
        components.push(
          <InputCheckBox
            key={key}
            value={value}
            name={key}
            setFormInput={setFormInput}
          />
        );
      } else if (typeof value === "object") {
        if (key === "photos" || key === "type") {
          components.push(
            <InputArray
              key={key}
              title={key}
              givenArray={value}
              setFormInput={setFormInput}
              name={key}
            />
          );
          continue;
        }
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
          : isEdit
          ? components.push(
              <EditArray
                name={key}
                setFormInput={setFormInput}
                givenArray={value}
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
    setFormInput((prevState) => {
      return {
        ...prevState,
        [name]: event.target.checked,
      };
    });
  };

  return (
    <>
      <div className="boolean">
        {name}
        <input type="checkbox" checked={value} onChange={handleInputChange} />
      </div>
      <input className="hidden" value={value} onChange={() => 1} name={name} />
    </>
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
    <>
      <div className="form-array">
        <div className="top-card">
          <p>{title}</p>
          <div className="line"></div>
        </div>
        <ul className="body-card">
          {displayArrray.map((obj) => {
            return (
              <li key={obj._id}>
                {title === "photos" ? (
                  <p>
                    <a href={`${obj}`} rel="noreferrer" target="_blank">
                      {obj}
                    </a>
                  </p>
                ) : (
                  <p>{obj}</p>
                )}
                <i
                  className="fa-solid fa-circle-minus"
                  onClick={() => removeFromArray(obj)}
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
              <p>Add new {title}</p>
            </li>
          )}
        </ul>
      </div>
      <input
        className="hidden"
        onChange={() => 1}
        name={name}
        value={displayArrray}
      />
    </>
  );
}

function EditArray({ name, givenArray, setFormInput }) {
  const [addedArray, setAddedArray] = useState([]);
  const [isOpenField, setIsOpenField] = useState(false);
  const [inputField, setInputField] = useState("");

  const renderGivenArray = givenArray.map((obj) => {
    if (name === "rooms") {
      return (
        <li key={obj._id}>
          <Link to={`/rooms/${obj._id}`}>
            <p>{obj.number}</p>
          </Link>

          <i
            onClick={() =>
              deleteInEditPage(
                name.slice(0, name.length - 1),
                obj.number,
                `room/${obj._id}`
              )
            }
            className="fa-solid fa-xmark"
          ></i>
        </li>
      );
    }

    if (name === "types") {
      return (
        <li key={obj._id}>
          <Link to={`/type/${obj._id}`}>
            <p>{obj.title}</p>
          </Link>
          <i
            onClick={() =>
              deleteInEditPage(
                name.slice(0, name.length - 1),
                obj.title,
                `type/${obj._id}`
              )
            }
            className="fa-solid fa-xmark"
          ></i>
        </li>
      );
    }
  });

  const renderAddedArray = addedArray.map((obj) => {
    return (
      <li key={obj}>
        <p>{obj}</p>
        <i
          className="fa-solid fa-circle-minus"
          onClick={() => removeFromArray(obj)}
        ></i>
      </li>
    );
  });

  const validateInputField = (value) => {
    if (value.length === 0) {
      return false;
    }

    if (name === "rooms") {
      return !isNaN(value * 1);
    }

    if (name === "types") {
      return value.length !== 0;
    }
  };

  const addToArray = () => {
    if (!validateInputField(inputField)) {
      return toastError("Invalid input");
    }

    setAddedArray((prevState) => [...prevState, inputField]);

    setInputField("");
    setIsOpenField(false);
  };

  const removeFromArray = (removeStr) => {
    const newArray = addedArray.filter((str) => str !== removeStr);

    setAddedArray(newArray);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
  };

  return (
    <>
      <div className="form-array">
        <div className="top-card">
          <p>{name}</p>
          <div className="line"></div>
        </div>
        <ul className="body-card">
          {renderGivenArray}
          {renderAddedArray}
          {isOpenField ? (
            <li className="addId_form">
              <input
                type="text"
                onChange={(e) => setInputField(e.target.value)}
              />
              <i onClick={addToArray} className="fa-solid fa-circle-check"></i>
            </li>
          ) : (
            <li onClick={() => setIsOpenField(true)}>
              Add {name.slice(0, name.length - 1)}{" "}
            </li>
          )}
        </ul>
      </div>
      {addedArray.length !== 0 && (
        <input
          className="hidden"
          onChange={() => 1}
          name={name}
          value={addedArray}
        />
      )}
    </>
  );
}

function InputDate({ title, givenArray, setFormInput, name }) {
  const [isAdd, setIsAdd] = useState(false);
  const [displayArrray, setDisplayArray] = useState(givenArray);
  const [isValidRange, setIsValidRange] = useState(false);
  const [rangePick, setRangePick] = useState([new Date(), new Date()]);

  const addToArray = () => {
    if (!isValidRange) {
      toastError("Invalid ranges");
      return;
    }

    const startDate = formattedDateInTimeZone(rangePick[0]);
    const endDate = formattedDateInTimeZone(rangePick[1]);

    setDisplayArray((prevState) => [
      ...prevState,
      {
        startDate: startDate,
        endDate: endDate,
      },
    ]);
    const newArray = [
      ...displayArrray,
      {
        startDate: startDate,
        endDate: endDate,
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

  const validateDateRange = (range) => {
    if (displayArrray.length === 0) {
      return true;
    }

    let selectStart = range[0];
    let selectEnd = range[1].setHours(0, 0, 0, 0);

    const isUnconflict = (bookedRange) => {
      const startDate = new Date(bookedRange.startDate);
      const endDate = new Date(bookedRange.endDate);

      return selectStart >= endDate || selectEnd <= startDate;
    };

    return displayArrray.every((bookedRange) => isUnconflict(bookedRange));
  };

  const getPickRange = (value) => {
    const isValidRange = validateDateRange(value);

    if (isValidRange) {
      setIsValidRange(true);

      return setRangePick(value);
    } else {
      setIsValidRange(false);

      return toastError("Conflict ranges");
    }
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
                <p>{`${formatDateFormAPI(
                  dateRange.startDate
                )} - ${formatDateFormAPI(dateRange.endDate)}`}</p>
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
                format="MM/dd/y"
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
      <input
        className="hidden"
        name="dateRange"
        onChange={() => 1}
        value={JSON.stringify(displayArrray)}
        type="hidden"
      />
    </>
  );
}
