import React from "react";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";

const GraphBox = styled.div`
  width: 10vh;
  height: 100px;
  border: 1px solid;
`;

function MyPage() {
  return (
    <>
      <Logo />
      <GraphBox></GraphBox>
    </>
  );
}

export default MyPage;
