import React from "react";
import { styled } from "styled-components";
import Testimg from "../../assets/img/testimg.png";

const StyledCard = styled.div`
  width: ${(props) => (!props.cardWidth ? "195px" : props.cardWidth)};
  height: ${(props) => (!props.cardHeight ? "300px" : props.cardHeight)};
  background: ${(props) =>
    props.background ? `var(--${props.background})` : `var(--vanilla-cream)`};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (props.color ? `var(--${props.color})` : `var(--black)`)};
  font-weight: ${(props) => props.weight};
  border-radius: ${(props) => (props.border ? props.border : "10px")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Poster = styled.div`
  width: ${(props) => (!props.posterWidth ? "60px" : props.posterWidth)};
  height: ${(props) => (!props.posterHeight ? "20px" : props.posterHeight)};
  object-fit: ${(props) => (props.type === "poster" ? "fill" : "none")};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  text-align: left;
`;
const Card = (props) => {
  const {
    cardWidth,
    cardHeight,
    fontSize,
    type,
    region,
    support_period,
    title,
    posterWidth,
    posterHeight,
  } = props;

  const regionValue = region || "전국";
  const supportPeriodValue = support_period || "기간 없음";

  return (
    <StyledCard
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      fontSize={fontSize}
      title={title}
      type={type}
      region={regionValue}
      support_period={supportPeriodValue}
    >
      <Poster posterWidth={posterWidth} posterHeight={posterHeight}>
        <img
          src={Testimg}
          alt="poster_img"
          width={posterWidth}
          height={posterHeight}
        />
      </Poster>
      <ContentBox>
        <h1>
          <b>{title}</b>
        </h1>
        모집 지역 : {region}
        <br />
        모집 기간 : {support_period}
      </ContentBox>
    </StyledCard>
  );
};

export default Card;
