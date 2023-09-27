import React from "react";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import MyData from "../components/mydata/MyData";
import Nav from "../components/Nav/Nav";
import Header from "../components/header/Header";

const Content = styled.div`
  margin-top: 70px;
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
      <Header />
      <Content>
        <MyData />
      </Content>
    </>
  );
}

export default MyPage;
