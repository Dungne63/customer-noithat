import React from "react";
import HomeCategory from "./components/HomeCategory";
import HomeProduct from "./components/HomeProduct";
import HomeBanner from "./components/HomeBanner";
import HomeBestSeller from "./components/HomeBestSeller";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col mt-4 items-center gap-4">
      <HomeBanner />
      <HomeCategory />
      <HomeProduct />
      <HomeBestSeller />
    </div>
  );
};

export default Home;
