import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/img/Modified_logo.svg";
import { ReactComponent as CalendarIcon } from "../assets/img/calendar_icon.svg";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

const InfoContainer = styled.div`
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
  left: 35vw;
`;
const FooterBox = styled.div`
  width: 70vw;
  height: 30vh;
  display: flex;
  bottom: 0px;
`;
const BirthBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Info = () => {
  const navigate = useNavigate();
  const movePage = () => {
    navigate("/business");
  };
  return (
    <InfoContainer>
      <HeaderBox>
        <Logo />
        <h1>&nbsp;함께, 드림</h1>
      </HeaderBox>
      <LineBox>
        <Line />
        <LineStatus />
      </LineBox>
      <MainBox>
        <h2>
          맞춤 정보를 제공하기 위해
          <br /> 입력해주세요 :)
        </h2>
        <BirthBox>
          <Input
            width="135px"
            height="50px"
            color="gray"
            placeholder="생년월일"
            borderradius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
          />
          -
          <Input
            width="20px"
            height="50px"
            color="gray"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
          />
          ●●●●●●
        </BirthBox>
        <hr background="--gray" />
        <DateBox>
          <Input
            width="270px"
            height="50px"
            placeholder="보호종료일"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
          />
          <Button type="icon" background="none">
            <CalendarIcon />
          </Button>
        </DateBox>
        <hr background="--gray" />
        <Input
          width="270px"
          height="50px"
          placeholder="거주지"
          border-radius="none"
          border="none"
          borderBottom="1px solid gray"
          background="--bgColor"
        />
        <hr background="--gray" />
      </MainBox>
      <FooterBox>
        <Button onClick={movePage} width="270px" fontSize="15px">
          회원가입
        </Button>
      </FooterBox>
    </InfoContainer>
  );
};
export default Info;
