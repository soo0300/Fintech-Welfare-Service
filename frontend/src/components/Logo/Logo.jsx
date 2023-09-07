import React from "react";
import logo from "../../assets/img/logo.png";
import { styled } from "styled-components";

const StyledLogo = styled.div`
  display: flex;
`;

const LogoImg = styled.img`
    width: 18%;
`;

function Logo() {
  return (
    <StyledLogo>
      <LogoImg src={logo} />
      <h2>함께, 드림</h2>
    </StyledLogo>
  );
}

export default Logo;
