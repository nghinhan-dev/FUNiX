import { useLoaderData } from "react-router-dom";

export default function QuoteItem() {
  const data = useLoaderData();
  const { [Object.keys(data)[0]]: quote } = data;

  return (
    <figure
      style={{
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <p
        style={{
          fontSize: "22px",
          fontWeight: "bolder",
        }}
      >
        {quote.content}
      </p>
      <p
        style={{
          fontStyle: "italic",
        }}
      >
        - {quote.author} -
      </p>
    </figure>
  );
}
