import React, { useEffect } from "react";
import "./App.css";
import TestCounter from "./components/TestCounter";
import Router from "./router/Router";
import Nav from "./components/Nav/Nav";

const App = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log("Service Worker Registered");
      });
  }
  return (
    <div className="App">
      <p>함께, 드림</p>
      <TestCounter />
      <Router />
      <Nav />
    </div>
  );
};

export default App;
