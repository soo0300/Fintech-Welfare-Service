import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "../views/Intro";
import Business from "../views/Business";
import MyPage from "../views/MyPage";
import ChatBot from "../views/ChatBot";
import RecommendPage from "../views/RecommendPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/intro" element={<Intro />}></Route>
          <Route path="/business" element={<Business />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/chatbot" element={<ChatBot />}></Route>
          <Route path="/recommendpage" element={<RecommendPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
