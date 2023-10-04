import { React, useEffect, useState } from "react";
import { styled } from "styled-components";
import Testimg from "../../assets/img/testimg.png";
import { DetailWelfare } from "../../api/welfare/Welfare";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";
import jsonData from "../../assets/data/region.json";

// 카드
const StyledCard = styled.div`
  width: 45%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDragging
      ? "rgba(0,0,0,0.5)"
      : props.backgroundColor || getRandomColor()};

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
  z-index: 2;
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
  z-index: 2;
`;

const ModalContant = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0% 5% 5% 5%;
  overflow-x: hidden;
`;

// 포스터 모달
const FullscreenModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
`;

const FullscreenImage = styled.img`
  width: 100vw;
  height: auto;
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
  const regionName = jsonData.find(
    (item) => data.region_key === item.region_key
  );
  const parentRegion =
    jsonData.find((item) => {
      if (regionName.parent_key !== null) {
        return regionName.parent_key === item.region_key;
      } else {
        return false;
      }
    }) || "";
  // 포스터 모달 열기
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [d_day, setD_day] = useState("");
  const handlePosterClick = () => {
    setFullscreenVisible(true);
  };

  useEffect(() => {
    window.addEventListener("popstate", function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  useEffect(() => {
    const endDate = new Date(data.end_date).getTime();
    const now = new Date().getTime();
    const remainingTime = endDate - now;
    if (remainingTime <= 0) {
      setD_day("마감");
    } else {
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setD_day(`${days}일 ${hours}시간`);
    }
  }, [data]);
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
          <p>
            모집 지역 : {parentRegion ? parentRegion.name : ""}{" "}
            {regionName.name}
          </p>
          <p>
            모집 기한 : {data.start_date.slice(0, -9)} ~{" "}
            {data.end_date.slice(0, -9)}
          </p>
          <p style={{ color: "red" }}>
            {d_day !== "마감" ? `${d_day}이 남았습니다` : "마감"}
          </p>
          <p>기관명 : {data.organization}</p>
          <p>
            총 지원 금액 :{" "}
            {data.support_fund !== 0
              ? `${
                  data.support_fund.toString().length > 4
                    ? `${data.support_fund.toString().slice(0, -4)}만원`
                    : `${data.support_fund}원`
                } / ${data.support_period}달`
              : "없음"}
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
  // Drag & Drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: props.id, origin: props.origin },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    cardWidth,
    cardHeight,
    fontSize,
    region,
    support_period,
    support_fund,
    title,
    remainTime,
    totalRegion,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [welfareData, setWelfareData] = useState(null);

  const regionValue = region !== "0" ? region : "전국";
  const supportPeriodValue = support_period || "기간 없음";

  // 데이터 가져오기
  async function handleCardClick(e) {
    if (!modalVisible) {
      try {
        const res = await DetailWelfare(id);
        setWelfareData(res.data);
        setModalVisible(true);
        if (!location.pathname.includes("detail")) {
          navigate(`${location.pathname}/detail`);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      navigate(`${location.pathname.slice(0, -7)}`);
    }
  }

  return (
    <>
      <StyledCard
        ref={drag}
        onClick={handleCardClick}
        backgroundColor={getRandomColor()}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        fontSize={fontSize}
        title={title}
        region={regionValue}
        support_period={supportPeriodValue}
        support_fund={support_fund}
        remainTime={remainTime}
        totalRegion={totalRegion}
        isDragging={isDragging}
      >
        <Poster src={Testimg} />

        <ContentBox>
          <h2>{title}</h2>
          <p>
            모집 지역 : {totalRegion}
            <br />
            지원 금액 :{" "}
            {support_fund.toString().length >= 5
              ? `${support_fund.toString().slice(0, -4)}만원`
              : support_fund === 0
              ? "없음"
              : `${support_fund}원`}
            <br />
            <span style={{ color: "red" }}>
              {remainTime !== "마감" ? `${remainTime}이 남았습니다` : "마감"}
            </span>
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
    </>
  );
};

export default Card;
