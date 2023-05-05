import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <br />
      <p>Sorry, an unexpected error has occurred.</p>
      <br />
      <p>
        <strong>
          <i>{error.statusText || error.message}</i>
        </strong>
      </p>
    </div>
  );
}
