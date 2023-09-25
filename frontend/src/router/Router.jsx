import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "../views/Intro";
import Business from "../views/Business";
import MyPage from "../views/MyPage";
import ChatBot from "../views/ChatBot";
import RecommendPage from "../views/RecommendPage";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Info from "../views/Info";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyFund from "../views/MyFund";

const Router = () => {
  return (
    <>
      <Routes>
        <Route Component={PrivateRoute}>
          <Route path="/business" element={<Business />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/myfund" element={<MyFund />} />
        </Route>
        <Route Component={PublicRoute}>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
