import React from "react";
import Layout from "../Layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";

function HomeScreen() {
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner/>
        <PopularMovies/>
        <Promos/>
        <TopRated/>
      </div>
    </Layout>
  );
}

export default HomeScreen;
