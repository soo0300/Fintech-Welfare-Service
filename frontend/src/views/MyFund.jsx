import React from "react";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import MyData from "../components/mydata/MyData";
import Nav from "../components/Nav/Nav";

const Header = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
`;
const Content = styled.div`
  width: 90%;
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
        <Nav></Nav>
      </Header>
      <Content>
        <MyData />
      </Content>
    </>
  );
}

export default MyPage;
