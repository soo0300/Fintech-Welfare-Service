import React from "react";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import BG1 from "../assets/img/login/Ellipse_476.svg";
import BG2 from "../assets/img/login/Ellipse_477.svg";
import BG3 from "../assets/img/login/Ellipse_478.svg";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: left;
  min-height: 100vh; /* Make the container at least the height of the viewport */
`;

const HeaderBox = styled.div`
  width: 70vw;
  height: 25vh;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 50vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
`;
const SignupBox = styled.div`
  width: 70vw;
  height: 10vh;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: blue;
  margin-left: 20px;
`;

const LogoImg = styled.img`
  width: 40vw;
  max-width: 100%;
  position: absolute;
  top: 60px;
  left: 120px;
  z-index: -1;
  opacity: 0.5;
`;
const BackFirst = styled.img`
  width: 30vw;
  max-width: 100%;
  position: absolute;
  top: 40px;
  left: 120px;
  z-index: -2;
`;
const BackSecond = styled.img`
  width: 50vw;
  max-width: 100%;
  position: absolute;
  top: 60px;
  left: 140px;
  z-index: -2;
`;
const BackThird = styled.img`
  width: 50vw;
  max-width: 100%;
  position: absolute;
  top: 60px;
  left: 50px;
  z-index: -2;
`;
const Login = () => {
  return (
    <LoginContainer className="LoginContainer">
      <LoginBox className="LoginBox">
        <HeaderBox className="HeaderBox">
          <h1>함께, 드림</h1>
          <LogoImg src={Logo} />
          자립준비청년들을 위한
          <br />
          맞춤형 지원 사업
          <br />
          추천 플랫폼
        </HeaderBox>
        <MainBox className="MainBox">
          <Input
            width="270px"
            height="50px"
            color="gray"
            placeholder="이메일 입력"
            border-radius="none"
            background="--bgColor"
          />
          <hr background="--gray" />
          <Input
            width="270px"
            height="50px"
            placeholder="비밀번호 입력"
            border-radius="none"
            background="--bgColor"
          />
          <hr background="--gray" />
          <Button width="270px" margin="20px" fontSize="15px">
            로그인
          </Button>
          <SignupBox>
            아직 회원이 아니신가요?
            <StyledLink href="/signup">회원가입</StyledLink>
          </SignupBox>
        </MainBox>
      </LoginBox>
      <BackFirst src={BG1} />
      <BackSecond src={BG2} />
      <BackThird src={BG3} />
    </LoginContainer>
  );
};

export default Login;
