import React from "react";
import Navbar from "./Components/Navbar";
import LandingPage from "./LandingPage/LandingPage";
import Carousel from "./Components/Carousel";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Carousel />
      <Footer />
    </>
  );
}
