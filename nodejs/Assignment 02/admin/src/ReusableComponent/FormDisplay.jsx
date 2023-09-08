/* eslint-disable react/prop-types */
export default function FormDisplay({ fields }) {
  const renderFields = (obj) => {
    const elements = [];
    for (const [key, value] of Object.entries(obj)) {
      elements.push(
        <p key={key}>
          {key} : <span>{value}</span>
        </p>
      );
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
