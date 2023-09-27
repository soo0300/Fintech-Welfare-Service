import React from "react";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { ReactComponent as AlarmIcon } from "../../assets/img/Alarm_icon.svg";
import { styled } from "styled-components";

const BusinessHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 70px;
  width: 100%;
  max-width: 500px;
  background-color: #f2f5fe;
  position: fixed;
  top: 0;
  z-index: 999;
`;

function Header() {
  return (
    <BusinessHead>
      <Logo />
      <AlarmIcon />
      <Nav />
    </BusinessHead>
  );
}

export default Header;
