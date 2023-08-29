import React from "react";

import Hero from "./Hero/Hero";
import Carousel from "./Carousel/Carousel";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const { city, byProperty, highestRatingResult } = useLoaderData();

  return (
    <>
      <Hero />
      <Carousel
        city={city}
        byProperty={byProperty}
        highestRatingResult={highestRatingResult}
      />
    </>
  );
}
