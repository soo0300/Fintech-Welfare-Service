import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/img/Modified_logo.svg";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  min-height: 100vh;
`;

const HeaderBox = styled.div`
  width: 70vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;
const LineBox = styled.div`
  width: 70vw;
  height: 10px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 50vh;
`;

const Line = styled.div`
  width: 70vw;
  height: 1px;
  background-color: gray;
`;
const LineStatus = styled.div`
  width: 35vw;
  height: 2px;
  background-color: black;
  position: absolute;
  top: 0;
`;
const FooterBox = styled.div`
  width: 70vw;
  height: 30vh;
  display: flex;
  bottom: 0px;
`;
const Signup = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdcheck, setPwdCheck] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  //영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(emailRegEx.test(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPwd(passwordValue);
  };

  const handlePasswordCheckChange = (e) => {
    const passwordCheckValue = e.target.value;
    setPwdCheck(passwordCheckValue);
    setPasswordValid(pwd === passwordCheckValue && passwordRegEx.test(pwd));
  };

  const nextPage = () => {
    if (isEmailValid && isPasswordValid) {
      navigate("/info");
    } else {
      alert("유효한 이메일과 비밀번호를 입력해주세요.");
    }
  };
  return (
    <SignupContainer>
      <HeaderBox>
        <Logo />
        <h1>&nbsp;함께, 드림</h1>
      </HeaderBox>
      <LineBox>
        <Line />
        <LineStatus />
      </LineBox>
      <MainBox>
        <h2>회원가입</h2>
        <Input
          width="270px"
          height="50px"
          color="gray"
          placeholder="이메일 입력"
          border-radius="none"
          border="none"
          borderBottom="1px solid gray"
          background="--bgColor"
          id="email"
          onChange={handleEmailChange}
        />
        {!isEmailValid && email && (
          <p style={{ color: "red" }}>유효한 이메일을 입력해주세요.</p>
        )}
        <Input
          width="270px"
          height="50px"
          placeholder="비밀번호 입력"
          border-radius="none"
          border="none"
          borderBottom="1px solid gray"
          background="--bgColor"
          type="password"
          id="pwd"
          onChange={handlePasswordChange}
        />
        <Input
          width="270px"
          height="50px"
          placeholder="비밀번호 확인"
          border-radius="none"
          border="none"
          borderBottom="1px solid gray"
          background="--bgColor"
          type="password"
          id="pwdcheck"
          onChange={handlePasswordCheckChange}
        />
        {!isPasswordValid && pwdcheck && (
          <p style={{ color: "red" }}>
            비밀번호가 일치하지 않거나 유효하지 않습니다.
          </p>
        )}
      </MainBox>
      <FooterBox>
        <Button onClick={nextPage} width="270px" fontSize="15px">
          다음
        </Button>
      </FooterBox>
    </SignupContainer>
  );
};
export default Signup;
