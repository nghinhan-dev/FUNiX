import Header from "./Header/Header";
import AvailableMeals from "./AvailableMeals/AvailableMeals";
import { CartProvider } from "./Context/CartContext";
import "./style.css";

export default function Lab() {
  return (
    <CartProvider>
      <div id="background">
        <Header />
        <AvailableMeals />
      </div>
    </CartProvider>
  );
}
