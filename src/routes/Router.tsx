import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Price from "./Price";
import Charts from "./Charts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Charts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
