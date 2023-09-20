import React from "react";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import MyData from "../components/mydata/MyData";
import Nav from "../components/Nav/Nav";

const Header = styled.div`
  width: 100%;
  height: 70px;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MyPage() {
  return (
    <>
      <Header>
        <Logo></Logo>
      </Header>
      <Content>
        <MyData></MyData>
      </Content>
      <Nav></Nav>
    </>
  );
}

export default MyPage;
