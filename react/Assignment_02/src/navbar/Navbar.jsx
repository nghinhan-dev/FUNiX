import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav id="navbar" className={`${isScrolled ? "isScrolled" : null}`}>
        <div className="container">
          <Link to={`/`}>
            <div className="brand">Silly Whale</div>
          </Link>
          <Link to={`/search`}>
            <div className="search__wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
