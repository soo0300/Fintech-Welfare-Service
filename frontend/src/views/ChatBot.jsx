import React from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/1492719128-robot_83633 1.svg";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const ChatHeader = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid;
  border-color: black;
  background-color: white;
  box-shadow: 0px -1px 10px 1px grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatContent = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
`;

const StyledEllipseIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: whitesmoke;
  border-radius: 50%;
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
      <ChatHeader>
        <Button width="40px" height="40px" background="none" onClick={moveBack}>
          <BackIcon />
        </Button>
        <StyledEllipseIcon>
          <BotIcon />
        </StyledEllipseIcon>
        드림이
      </ChatHeader>
      <ChatContent></ChatContent>
      <Input width="90%" height="40px" borderradius="85px"></Input>
      <Nav></Nav>
    </>
  );
}

export default ChatBot;
