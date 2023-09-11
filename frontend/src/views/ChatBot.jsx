import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/boticon.svg";
import { ReactComponent as SendIcon } from "../assets/img/sendicon.svg";

import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 8%;
  border-bottom: 1px solid;
  border-color: black;
  background-color: white;
  box-shadow: 0px -1px 10px 1px grey;
  display: flex;
  align-items: center;
  position: fixed;
  gap: 20px;
`;

const ChatContent = styled.div`
  width: 90%;
  margin-top: 18%;
  height: 78%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  position: fixed;
  gap: 10px;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80%;
  height: auto;
  max-height: 200px;
  bottom: 5%;
  position: fixed;
  border-radius: 10px;
  font-size: 18px;
`;

const ChatInput = styled.textarea`
  width: 80%;
  margin: 10px;
  /* border-radius: 85px; */
  font-size: 18px;
  white-space: normal;
  height: auto;
  max-height: 180px;
  min-height: 20px;
  overflow-y: auto;
  resize: none;
`;

const ChatContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  white-space: normal;
  border-radius: 20px;
  max-width: 70%;
`;

const StyledEllipseIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: whitesmoke;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledTextarea = styled(TextareaAutosize)`
  font-size: 12px;
  width: 80%;
  height: 5%;
  margin: 10px;
  border: none;
  &:focus {
    outline: none; /* 포커스 시 외곽선 제거 */
  }
`;

function ChatBot() {
  const [message, setMessage] = useState([
    ["안녕하세요! 무엇을 도와드릴까요?", "bot"],
  ]);
  const [myMessage, setMyMessage] = useState("");
  const chatScrollRef = useRef(null);
  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/business");
  };

  const changeMessage = (e) => {
    setMyMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage([...message, [myMessage, "notbot"]]);
    setMyMessage("");
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <Container>
      <ChatHeader>
        <div></div>
        <Button width="40px" height="40px" background="none" onClick={moveBack}>
          <BackIcon />
        </Button>
        <StyledEllipseIcon>
          <BotIcon />
        </StyledEllipseIcon>
        <h3>드림이</h3>
      </ChatHeader>

      <ChatContent ref={chatScrollRef}>
        {message.map((data, index) => (
          <div key={index}>
            {data[1] === "bot" ? (
              <ChatContainer>
                <StyledEllipseIcon>
                  <BotIcon />
                </StyledEllipseIcon>
                <ChatBox>
                  <div>{data[0]}</div>
                </ChatBox>
              </ChatContainer>
            ) : (
              <div className="message-yourbody">{data[0]}</div>
            )}
          </div>
        ))}
      </ChatContent>

      <ChatForm onSubmit={sendMessage}>
        <StyledTextarea
          placeholder="메세지를 입력하세요"
          value={myMessage}
          onChange={changeMessage}
        ></StyledTextarea>
        <Button width="50px" height="50px" background="none" type="submit">
          <SendIcon />
        </Button>
      </ChatForm>
    </Container>
  );
}

export default ChatBot;
