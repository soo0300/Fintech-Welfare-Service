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
  background-color: ${(props) => props.backgroundColor || getRandomColor()};
  margin-bottom: 2%;
`;

const Poster = styled.img`
  width: 90%;
  height: 50%;
  object-fit: fill;
  margin: 5% 5% 0% 5%;
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
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 모달 외부 배경 색상 및 투명도 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

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
  border-radius: 10px;
`;

const ModalContant = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0% 5% 5% 5%;
  overflow-x: hidden;
`;

// 포스터 모달
const FullscreenModalBackground = styled.div``;

const FullscreenImage = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* object-fit: fill; */
  overflow-y: auto;
`;

// 포스터 모달
function FullscreenImageModal({ src, onClose }) {
  return (
    <FullscreenModalBackground onClick={onClose}>
      <FullscreenImage src={src} />
    </FullscreenModalBackground>
  );
}

// 카드 색 랜덤 추출
function getRandomColor() {
  const colors = ["#EEA8A8", "#F8EBBE", "#9CEFEA", "#EEBEF2", "#B0D5F8"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// 모달
function Modal({ data, onClose }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    onClose();
  };

  // 포스터 모달 열기
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  const handlePosterClick = () => {
    setFullscreenVisible(true);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={stopPropagation}>
        <Poster src={Testimg} onClick={handlePosterClick} />

        {fullscreenVisible && (
          <FullscreenImageModal
            src={Testimg}
            onClose={() => setFullscreenVisible(false)}
          />
        )}

        <ModalContant onClick={stopPropagation}>
          <h2>{data.name}</h2>
          <p>{data.description_origin}</p>
          <p>모집 지역 : 전국</p>
          <p>모집 기한 : {data.start_date}</p>
          <p>기관명 : {data.organization}</p>
          <p>
            총 지원 금액 : {data.support_fund}원 * {data.support_period}달
          </p>
          <p>제출 서류 : {data.submission}</p>
          <p>신청 방법 : {data.route}</p>
          <p>
            신청 url:{" "}
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
          </p>
        </ModalContant>
      </ModalContainer>
    </ModalBackground>
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
    // 모달이 열려있지 않을 때만 데이터를 가져오고 모달을 엽니다.
    if (!modalVisible) {
      try {
        const res = await DetailWelfare(id);
        setWelfareData(res.data);
        setModalVisible(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <StyledCard
      onClick={handleCardClick}
      backgroundColor={getRandomColor()}
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
          <Modal
            data={welfareData}
            onClose={() => setModalVisible(false)}
            backgroundColor={props.backgroundColor}
          />
        )}
      </ContentBox>
    </StyledCard>
  );
};

export default Card;
