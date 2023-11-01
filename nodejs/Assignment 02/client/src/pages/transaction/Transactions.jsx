import { useLoaderData } from "react-router-dom";

export default function Transactions() {
  const data = useLoaderData();
  console.log("data:", data);

  return <section>Transactions</section>;
}
