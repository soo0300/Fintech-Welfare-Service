import React from "react";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  min-height: 100vh;
`;
const LogoImg = styled.img`
  width: 40vw;
  max-width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const HeaderBox = styled.div`
  width: 70vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const LineBox = styled.div`
  width: 70vw;
  height: 10px;
  display: flex;
  flex-direction: row;
`;
const Line = styled.div`
  width: 35vw;
  height: 5px;
  background-color: black;
  display: inline-block;
  &::after {
    content: "";
    width: 35vw;
    height: 2px;
    background-color: black;
    display: inline-block;
  }
`;
const Signup = () => {
  return (
    <SignupContainer>
      <HeaderBox>
        <LogoImg src={Logo} />
        <h1>함께, 드림</h1>
      </HeaderBox>
      <LineBox>
        <Line />
      </LineBox>
    </SignupContainer>
  );
};
export default Signup;
