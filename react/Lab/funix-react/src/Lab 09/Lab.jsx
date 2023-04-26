import Header from "./Header/Header";
import AvailableMeals from "./AvailableMeals/AvailableMeals";
import { CartProvider } from "./Context/CartContext";
import { createPortal } from "react-dom";
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
