import React, { useState } from "react"; // useState import
import Nav from "../components/Nav/Nav";
import Button from "../components/button/Button";
import { styled } from "styled-components";
import Header from "../components/header/Header";
import Card from "../components/card/Card";

// Icon
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import { ReactComponent as WhitePlusIcon } from "../assets/img/Vector.svg";
import { ReactComponent as MinusIcon } from "../assets/img/minus.svg";

// 사업을 넣는 박스를 갖는 컨테이너
const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100%-154px);
  /* padding-top: 30px; */
  /* padding-bottom: 94px; */
  overflow-y: scroll;
`;

// 카드를 넣었을 때와 안넣었을 때 박스 공통 설정
const BusinessBasicBox = styled.div`
  background-color: #fff;
  width: 100%;
  margin-bottom: 7%;
  border-radius: 10px;
`;

// 카드를 안넣었을 때 박스
const BusinessNothingBox = styled(BusinessBasicBox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// 카드를 넣었을 때 박스
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

// 맞춤 지원 사업
const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
`;

const CustomCardBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
  flex-wrap: wrap;
`;

const Money = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
  flex-wrap: wrap;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
`;

const HR = styled.hr`
  width: 83%;
`;

// 넣은 사업이 없을 때
function BusinessNothing(props) {
  return (
    <>
      <BusinessNothingBox>
        <Text>
          <p style={{ color: props.titleColor }}>{props.title}</p>을 넣어주세요
        </Text>
        <WhitePlusIcon width="10%" />
      </BusinessNothingBox>
    </>
  );
}

// 사업을 넣었을 때
function BusinessBody(props) {
  // 플러스 마이너스 버튼을 통해 보여지고 안보여지고
  const [isCardVisible, setCardVisible] = useState(false); // State for Card visibility

  return (
    <BusinessBox>
      <BusinessBoxTop>
        <p style={{ color: props.titleColor }}>{props.title}</p>
        {isCardVisible ? (
          <MinusIcon
            width="6%"
            onClick={() => setCardVisible(!isCardVisible)}
          />
        ) : (
          <PlusIcon width="6%" onClick={() => setCardVisible(!isCardVisible)} />
        )}{" "}
      </BusinessBoxTop>
      <HR />
      <Money>
        <p>매 달</p>
        <p style={{ color: props.moneyColor }}>{props.money}₩</p>
        <p>{props.comment}</p>
      </Money>
      {isCardVisible && (
        <CardContainer>
          <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
          <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
          <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
        </CardContainer>
      )}
    </BusinessBox>
  );
}

// 맞춤 지원 사업
function CustomBusinesss() {
  return (
    <CustomContainer>
      <p>맞춤 지원 사업</p>
      <HR />
      <CustomCardBox>
        {/* <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
        <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" /> */}
        {/* <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" /> */}
      </CustomCardBox>
    </CustomContainer>
  );
}

// 페이지 전체
function Business() {
  return (
    <>
      <Header />
      <BusinessContainer>
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
      </BusinessContainer>
      <Nav />
    </>
  );
}

export default Business;
