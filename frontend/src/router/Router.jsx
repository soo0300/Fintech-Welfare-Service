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
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/business" element={<Business />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/recommendpage" element={<RecommendPage />} />
      </Routes>
    </>
  );
};

export default Router;
