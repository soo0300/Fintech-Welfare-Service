import React from "react";
import Button from "../components/button/Button";
import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import { ReactComponent as WhitePlusIcon } from "../assets/img/Vector.svg";
import Header from "../components/header/Header";
import Card from "../components/card/Card";

const BusinessBasicBox = styled.div`
  background-color: #fff;
  width: 40vh;
  height: 100%;
  margin: 3% 0 8% 7.5%;
  border-radius: 10px;
  font-weight: bold;
`;

const BusinessNothingBox = styled(BusinessBasicBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
`;

const BusinessBox = styled(BusinessBasicBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BusinessBoxTop = styled.div`
  display: flex;
  width: 115%;
  justify-content: space-around;
  align-items: center;
`;

const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 86%;
  margin: 3% 0 8% 7.5%;
  border-radius: 10px;
`;

const CustomCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Money = styled.div`
  display: flex;
  width: 77%;
  justify-content: space-between;
`;

const HR = styled.hr`
  width: 83%;
`;

function BusinessNothing(props) {
  return (
    <>
      <BusinessNothingBox>
        <b>
          <p style={{ color: props.titleColor }}>{props.title}</p>
        </b>
        <p>을 넣어주세요</p>
        <Button
          width="13%"
          background="#grey"
          border="30px"
          margin="0px 0px 0px 6%"
        >
          <WhitePlusIcon width="60%" />
        </Button>
      </BusinessNothingBox>
    </>
  );
}

function BusinessBody(props) {
  return (
    <BusinessBox>
      <BusinessBoxTop>
        <p style={{ color: props.titleColor }}>{props.title}</p>
        <PlusIcon width="6%" />
      </BusinessBoxTop>
      <HR />
      <Money>
        <p>매 달</p>
        <p style={{ color: props.moneyColor }}>{props.money}₩</p>
        <p>{props.comment}</p>
      </Money>
    </BusinessBox>
  );
}

function CustomBusinesss() {
  return (
    <CustomContainer>
      <p>맞춤 지원 사업</p>
      <HR />
      <CustomCardBox>
        {/* <Card cardWidth="10rem" cardHeight="15rem" posterWidth="3rem" />
          <Card cardWidth="10rem" cardHeight="15rem" posterWidth="3rem" /> */}
      </CustomCardBox>
    </CustomContainer>
  );
}

function Business() {
  return (
    <>
      <Header />
      <BusinessNothing title="심사 중인 지원 사업" titleColor="#F66262" />
      <BusinessNothing title="지원 받고 있는 사업" titleColor="#006FFD" />

      <BusinessBody
        title="심사 중인 지원 사업"
        titleColor="#F66262"
        money="3,000,000"
        moneyColor="#30BC19"
        comment="더 받을 수 있습니다."
      />
      <BusinessBody
        title="지원 받고 있는 사업"
        titleColor="#006FFD"
        money="9,000,000"
        moneyColor="#30BC19"
        comment="지원 받고 있습니다."
      />
      <CustomBusinesss />
    </>
  );
}

export default Business;
