import React from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/button/Button";
import { ReactComponent as AlarmIcon } from "../assets/img/Alarm_icon.svg";
import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import Card from "../components/card/Card";

const BusinessHead = styled.div`
  display: flex;
`;

const BusinessBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 23rem;
  height: 5rem;
  margin: 1rem 0 2rem 2rem;
  border-radius: 10px;
`;

const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 23rem;
  margin: 1rem 0 2rem 2rem;
  border-radius: 10px;
`;

const CustomCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HR = styled.hr`
  width: 19rem;
`;

function Head() {
  return (
    <>
      <BusinessHead>
        <Logo></Logo>
        <Button
          margin="0px 1.5rem 0px 0px"
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

function BusinessNothing(props) {
  return (
    <>
      <BusinessBox>
        <b>
          <p style={{ color: props.txtColor }}>{props.title}</p>
        </b>
        <p>을 넣어주세요</p>
        <Button
          width="3rem"
          background="#grey"
          border="30px"
          margin="0px 0px 0px 2rem"
        >
          <PlusIcon width="1.5rem" />
        </Button>
      </BusinessBox>
    </>
  );
}

function BusinessBody() {
  return <></>;
}

function CustomBusinesss() {
  return (
    <>
      <CustomContainer>
        <p>맞춤 지원 사업</p>
        <HR />
        <CustomCardBox>
          <Card cardWidth="10rem" cardHeight="15rem" posterWidth="3rem" />
          <Card cardWidth="10rem" cardHeight="15rem" posterWidth="3rem" />
        </CustomCardBox>
      </CustomContainer>
    </>
  );
}

function Business() {
  return (
    <>
      <Head />
      <BusinessNothing title="심사 중인 지원 사업" txtColor="#F66262" />
      <BusinessNothing title="지원 받고 있는 사업" txtColor="#006FFD" />

      <BusinessBody />
      <BusinessBody />
      <CustomBusinesss />
    </>
  );
}

export default Business;
