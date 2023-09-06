import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const movepage = () => {
    navigate("/intro");
  };
  return (
    <>
      <button onClick={movepage}>인트로</button>
    </>
  );
};

export default Nav;
