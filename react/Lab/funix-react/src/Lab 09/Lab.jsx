import "./style.css";
import Header from "./Header/Header";
import AvailableMeals from "./AvailableMeals/AvailableMeals";

export default function Lab() {
  return (
    <div className="background">
      <Header />
      <AvailableMeals />
    </div>
  );
}
