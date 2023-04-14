import navData from "/data/navBar.json";
import NavbarItem from "./NavbarItem/NavbarItem";

export default function Home() {
  let renderNavItem = navData.map((item) => (
    <NavbarItem
      key={item.title + `id`}
      title={item.title}
      icon={item.icon}
      active={item.active}
    />
  ));
  return (
    <section id="navbar">
      <div className="container">
        <div className="navbrand">
          <p>Booking Websites</p>
          <div className="userLogin">
            <button className="btn">Register</button>
            <button className="btn">Login</button>
          </div>
        </div>
        <div className="navitemlist">{renderNavItem}</div>
      </div>
    </section>
  );
}
