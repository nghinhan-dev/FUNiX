import Banner from "./Banner";
import Categories from "./Categories";
import Trending from "./Trending";
import OtherInfo from "./OtherInfo";

export default function HomePage() {
  // every component is a section
  return (
    <>
      <Banner />
      <Categories />
      <Trending />
      <OtherInfo />
    </>
  );
}
