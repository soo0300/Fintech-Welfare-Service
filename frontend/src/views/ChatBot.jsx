import React from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/1492719128-robot_83633 1.svg";
import { useNavigate } from "react-router-dom";

const ChatHeader = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid;
  border-color: black;
  box-shadow: 0px -1px 10px 1px grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledEllipseIcon = styled.div`
  // 원 모양의 스타일을 여기에 추가하세요.
  width: 50px; // 원의 너비
  height: 50px; // 원의 높이
  background-color: whitesmoke; // 원의 배경색
  border-radius: 50%; // 원 모양
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ChatBot() {
  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/business");
  };
  return (
    <>
      <ChatHeader className="신대혁">
        <Button width="40px" height="40px" background="none" onClick={moveBack}>
          <BackIcon />
        </Button>
        <StyledEllipseIcon>
          <BotIcon />
        </StyledEllipseIcon>
        드림이
      </ChatHeader>
    </>
  );
}

export default ChatBot;
