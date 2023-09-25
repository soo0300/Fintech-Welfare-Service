import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/boticon.svg";
import { ReactComponent as SendIcon } from "../assets/img/Send_icon.svg";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./ChatBot.css";

import { ChatBotAxios } from "../api/chatbot/Chatbot";
import Card from "../components/card/Card";
import { DetailWelfare } from "../api/welfare/Welfare";

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  white-space: pre-line;
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
  gap: 20px;
`;

// 채팅창
const ChatContent = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  font-size: 14px;
`;

//채팅입력창
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 90%;
  height: auto;
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
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 25%;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 20px;
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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
`;

function ChatBot() {
  const [message, setMessage] = useState([
    ["안녕하세요!\n저는 드림이 입니다^^\n무엇을 도와드릴까요?", "bot"],
  ]);
  const [myMessage, setMyMessage] = useState("");
  const [item, setItem] = useState([]);
  const chatScrollRef = useRef(null);

  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/business");
  };

  const changeMessage = (e) => {
    if (e.target.value.length <= 100) {
      setMyMessage(e.target.value);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const res = await ChatBotAxios(myMessage);
    console.log(res);
    if (res.data.length === 0) {
      setMessage([
        ...message,
        [myMessage, "notbot"],
        ["결과를 찾을 수 없습니다ㅠㅠ\n정확한 정보를 입력해주세요.", "bot"],
      ]);
    } else {
      const detail = await DetailWelfare(res.data[0].welfareId);
      console.log(detail);
      setItem(detail.data);
      setMessage([
        ...message,
        [myMessage, "notbot"],
        [`지원사업을 추천해드릴게요!`, "bot"],
        [`${res.data[0].name}`, "bot"],
        [
          <CardContainer>
            <Card
              key={detail.data.id}
              id={detail.data.id}
              title={detail.data.name}
              region={detail.data.region_key}
              support_period={detail.data.start_date}
            />
          </CardContainer>,
          "bot",
        ],
      ]);
    }
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
        <Today />
        {message.map((data, index) => (
          <div key={index}>
            {data[1] === "bot" ? (
              <>
                <div className="yours messages">
                  <StyledEllipseIcon>
                    <BotIcon />
                  </StyledEllipseIcon>
                  <div className="message last">{data[0]}</div>
                </div>
              </>
            ) : (
              <div className="mine messages">
                <div className="message last">{data[0]}</div>
              </div>
            )}
          </div>
        ))}
      </ChatContent>

      <Footer>
        <ChatForm onSubmit={sendMessage}>
          <StyledTextarea
            required
            placeholder=""
            value={myMessage}
            onChange={changeMessage}
          />
          <Button width="50px" height="50px" background="none" type="submit">
            <SendIcon />
          </Button>
        </ChatForm>
      </Footer>
    </Container>
  );
}

export default ChatBot;
