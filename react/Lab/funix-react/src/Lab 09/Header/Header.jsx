import { TypeAnimation } from "react-type-animation";

export default function Header() {
  return (
    <section id="navbar">
      <div className="container row">
        <div className="brand row">
          <img
            className="logo"
            src="./images/foodie_whale_logo.png"
            alt="logo.png"
          />
          <h2 className="navbrand">foodie_whale</h2>
        </div>
        <div className="cart row">
          <i className="fa fa-cart-plus"></i>
          <h5>Your Cart</h5>
          <p className="cartNum row">4</p>
        </div>
      </div>

      <div className="container typingFx">
        <TypeAnimation
          sequence={[
            "There is no ",
            70,
            "There is no sincerer ",
            270,
            "There is no sincerer love ",
            470,
            "There is no sincerer love than the ",
            570,
            "There is no sincerer love than the love ",
            770,
            "There is no sincerer love than the love of food.",
            1170,
            "-",
            1470,
            "George Bernard Shaw",
            1700,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "2em", display: "inline-block" }}
        />
      </div>
    </section>
  );
}
