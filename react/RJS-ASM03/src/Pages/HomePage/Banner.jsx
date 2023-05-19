import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  const navToShop = () => {
    navigate("/shop");
  };

  return (
    <div id="homepage_banner">
      <Container>
        <div className="d-flex align-items-start justify-content-center flex-column">
          <p className="opacity-75">NEW INSPIRATION 2020</p>
          <p className="fs-2">20% OFF ON NEW SEASON</p>

          <Button onClick={navToShop} variant="dark">
            Browse collections
          </Button>
        </div>
      </Container>
    </div>
  );
}
