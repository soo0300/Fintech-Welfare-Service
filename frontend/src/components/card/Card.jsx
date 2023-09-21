import { React, useState } from "react";
import { styled } from "styled-components";
import Testimg from "../../assets/img/testimg.png";
import { DetailWelfare } from "../../api/welfare/Welfare";

// 카드
const StyledCard = styled.div`
  width: 45%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: var(--vanilla-cream);
`;

const Poster = styled.img`
  width: 90%;
  height: 50%;
  object-fit: fill;
  margin-top: 5%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  text-align: left;
  font-size: 50%;
  margin: 0% 5% 5% 5%;
`;

// 모달
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  font-size: 2vh;
`;

const ModalContant = styled.div`
  flex: 1;
  overflow: auto;
`;

// 모달
function Modal({ data, onClose }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  console.log(data);
  return (
    <ModalContainer onClick={onClose}>
      <Poster src={Testimg}></Poster>
      <h2>{data.name}</h2>
      <ModalContant onClick={stopPropagation}>
        <p>모집 지역 : 전국</p>
        <p>모집 기한 : {data.start_date}</p>
        <p>기관명 : {data.organization}</p>
        <p>총 지원 금액 : {data.support_fund}원</p>
        <p>
          신청 url: <a href={data.url}>{data.url}</a>
        </p>
      </ModalContant>
    </ModalContainer>
  );
}

const Card = (props) => {
  const { id, cardWidth, cardHeight, fontSize, region, support_period, title } =
    props;

  const [modalVisible, setModalVisible] = useState(false);
  const [welfareData, setWelfareData] = useState(null);

  const regionValue = region || "전국";
  const supportPeriodValue = support_period || "기간 없음";

  // 데이터 가져오기
  async function handleCardClick() {
    try {
      const res = await DetailWelfare(id);
      setWelfareData(res.data);
      setModalVisible(true);
      console.log(setWelfareData);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <StyledCard
      onClick={handleCardClick}
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      fontSize={fontSize}
      title={title}
      region={regionValue}
      support_period={supportPeriodValue}
    >
      <Poster src={Testimg} />

      <ContentBox>
        <h2>{title}</h2>
        <p>
          모집 지역 : {region}
          <br />
          모집 기간 : {support_period}
        </p>
        {modalVisible && (
          <Modal data={welfareData} onClose={() => setModalVisible(false)} />
        )}
      </ContentBox>
    </StyledCard>
  );
};

export default Card;
