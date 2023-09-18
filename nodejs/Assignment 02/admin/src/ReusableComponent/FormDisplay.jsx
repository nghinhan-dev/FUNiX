/* eslint-disable react/prop-types */
export default function FormDisplay({ fields }) {
  const renderFields = (obj) => {
    const elements = [];
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        key === "bookedRange"
          ? elements.push(
              <p key={key}>
                {key}: <span>{displayDateArray(value)}</span>
              </p>
            )
          : elements.push(
              <p key={key}>
                {key} : <span>{value.toString()}</span>
              </p>
            );
      } else {
        elements.push(
          <p key={key}>
            {key}: <span>{value}</span>
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="table_container add-display main-shadow">
      <code>
        <p className="bracket">{`{`}</p>
        {renderFields(fields)}
        <p className="bracket">{`}`}</p>
      </code>
    </div>
  );
}

function displayDateArray(value) {
  const result = value.reduce((acc, cur) => {
    return acc + `${cur.startDate} to ${cur.endDate}, `;
  }, "");

  return result;
}
