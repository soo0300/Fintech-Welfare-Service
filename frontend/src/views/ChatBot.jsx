import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/boticon.svg";
import { ReactComponent as SendIcon } from "../assets/img/Send_icon.svg";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./ChatBot.css";

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  white-space: pre-line;
  /* overscroll-behavior: none; */
`;

// 챗봇 상단바
const ChatHeader = styled.div`
  width: 100%;
  height: 70px;
  border-color: black;
  background-color: white;
  box-shadow: 0px 0px 10px 0px grey;
  display: flex;
  align-items: center;
  position: fixed;
  gap: 20px;
`;

// 채팅창
const ChatContent = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 70px;
  height: ${(props) => (props.isInputActive ? "200px" : "calc(100% -150px)")};
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  position: fixed;
  font-size: 14px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  bottom: ${(props) => (props.isInputActive ? "330px" : "0")};
  position: fixed;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 90%;
  height: auto;
  position: fixed;
  border-radius: 30px;
  font-size: 18px;
  overflow: hidden;
`;

const StyledTextarea = styled(TextareaAutosize)`
  font-size: 18px;
  width: 80%;
  height: 5%;
  margin: 10px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
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

const TodayBox = styled.div`
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 20px;
  margin-bottom: 20px;
`;

// 오늘날짜
function Today() {
  const year = new Date().getFullYear() + "년";
  const month = new Date().getMonth() + 1 + "월";
  const day = new Date().getDate() + "일";

  return (
    <TodayBox>
      {year} {month} {day}
    </TodayBox>
  );
}

function ChatBot() {
  const [message, setMessage] = useState([
    ["안녕하세요! \n무엇을 도와드릴까요?", "bot"],
  ]);
  const [myMessage, setMyMessage] = useState("");
  const chatScrollRef = useRef(null);

  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/business");
  };

  const [isInputActive, setInputActive] = useState(false);
  const [isButton, setisButton] = useState(false);

  const changeMessage = (e) => {
    if (e.target.value.length <= 100) {
      setMyMessage(e.target.value);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage([...message, [myMessage, "notbot"]]);
    setMyMessage("");
    setInputActive(false);
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [message]);

  const handleInputFocus = () => {
    setisButton(true);
    setInputActive(true);
  };

  const handleInputBlur = () => {
    setisButton(false);
    setInputActive(false);
  };

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

      <ChatContent ref={chatScrollRef} isInputActive={isInputActive}>
        <Today />
        {message.map((data, index) => (
          <div key={index}>
            {data[1] === "bot" ? (
              <>
                <div class="yours messages">
                  <StyledEllipseIcon>
                    <BotIcon />
                  </StyledEllipseIcon>
                  <div class="message last">{data[0]}</div>
                </div>
              </>
            ) : (
              <div class="mine messages">
                <div class="message last">{data[0]}</div>
              </div>
            )}
          </div>
        ))}
      </ChatContent>

      <Footer isInputActive={isInputActive}>
        <ChatForm onSubmit={sendMessage}>
          <StyledTextarea
            required
            placeholder=""
            value={myMessage}
            onChange={changeMessage}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {isButton ? (
            <Button width="50px" height="50px" background="none" type="submit">
              <SendIcon />
            </Button>
          ) : (
            ""
          )}
        </ChatForm>
      </Footer>
    </Container>
  );
}

export default ChatBot;
