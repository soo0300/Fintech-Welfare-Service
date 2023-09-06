import React from "react";
import "./App.css";
import Router from "./router/Router";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Router></Router>
      <Nav></Nav>
    </div>
  );
}

export default App;
