import React from "react";
import Logo from "../Logo/Logo";
import { ReactComponent as AlarmIcon } from "../../assets/img/Alarm_icon.svg";
import { styled } from "styled-components";
import Button from "../button/Button";

const BusinessHead = styled.div`
  display: flex;
`;

function Header() {
  return (
    <>
      <BusinessHead>
        <Logo></Logo>
        <Button
          margin="0px 7% 0px 0px"
          type="icon"
          background="none"
          hoverbgcolor="none"
        >
          <AlarmIcon />
        </Button>
      </BusinessHead>
    </>
  );
}

export default Header;
