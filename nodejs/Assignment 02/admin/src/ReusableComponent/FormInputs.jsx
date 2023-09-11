/* eslint-disable react/prop-types */

export default function FormInputs({ fields, setFormInput }) {
  const renderFields = (obj) => {
    const components = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id") {
        continue;
      }

      if (key.includes("is")) {
        components.push(
          <InputCheckBox
            key={key}
            value={value}
            name={key}
            setFormInput={setFormInput}
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
    top: "0px",
  };

  const emptyStyle = {
    top: "28px",
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
      <label style={value.length !== 0 ? filledStyle : emptyStyle}>
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
      [event.target.name]: event.target.cheked,
    }));
  };

  return (
    <div>
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
