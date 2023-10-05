/* eslint-disable react/prop-types */
import { formatDateFormAPI } from "../util/timeZone";

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
                {key} : <span>{displayArray(key, value)}</span>
              </p>
            );
      } else {
        elements.push(
          <p key={key}>
            {key}:
            <span>
              {typeof value !== "boolean"
                ? value
                : value === true
                ? "true"
                : "false"}
            </span>
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
    return (
      acc +
      `${formatDateFormAPI(cur.startDate).slice(0, 5)} to ${formatDateFormAPI(
        cur.endDate
      ).slice(0, 5)}, `
    );
  }, "");

  return result;
}

function displayArray(key, arrValue) {
  let result;

  if (key === "rooms") {
    result = arrValue.reduce((acc, cur) => {
      return acc + `${cur.number},`;
    }, "");
  }

  if (key === "photos" || key === "type") {
    result = arrValue.reduce((acc, cur) => {
      return acc + `${cur},`;
    }, "");
  }

  if (key === "types") {
    result = arrValue.reduce((acc, cur) => {
      return acc + `${cur.title},`;
    }, "");
  }

  return result;
}
