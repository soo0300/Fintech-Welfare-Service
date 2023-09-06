import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
