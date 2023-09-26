import React from "react";
import logo from "../../assets/img/logo.png";
import { styled } from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  width: 70%;
  height: 70px;
`;

const LogoImg = styled.img``;

function Logo() {
  return (
    <StyledLogo>
      <LogoImg src={logo} />
      <h2>함께, 드림</h2>
    </StyledLogo>
  );
}

export default Logo;
