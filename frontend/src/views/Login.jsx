import React from "react";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";
import Input from "../components/input/Input";
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const HeaderBox = styled.div`
  width: 100vw;
  height: 35vh;
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: 50vh;
`;
const Login = () => {
  return (
    <LoginContainer className="LoginContainer">
      <HeaderBox className="HeaderBox">
        <h1>함께, 드림</h1>
        자립준비청년들을 위한
        <br />
        맞춤형 지원 사업
        <br />
        추천 플랫폼
      </HeaderBox>
      <MainBox className="MainBox">
        <Input
          width="200px"
          color="gray"
          placeholder="이메일 입력"
          border-radius="none"
        />
        <hr background="black" />
        <Input placeholder="비밀번호 입력" border-radius="none" />
        <hr />
      </MainBox>
    </LoginContainer>
  );
};

export default Login;
