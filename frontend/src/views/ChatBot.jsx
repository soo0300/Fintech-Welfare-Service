import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/boticon.svg";
import { ReactComponent as SendIcon } from "../assets/img/Send_icon.svg";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./ChatBot.css";

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
  border-color: black;
  background-color: white;
  box-shadow: 0px 0px 20px 0px grey;
  display: flex;
  align-items: center;
  position: fixed;
  gap: 20px;
`;

const ChatContent = styled.div`
  width: 100%;
  margin-top: 18%;
  height: 78%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  position: fixed;
  gap: 20px;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80%;
  height: auto;
  bottom: 5%;
  position: fixed;
  border-radius: 10px;
  font-size: 18px;
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
    if (e.target.value.length <= 100) {
      setMyMessage(e.target.value);
    }
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
              <>
                <ChatContainer>
                  <StyledEllipseIcon>
                    <BotIcon />
                  </StyledEllipseIcon>
                  <ChatBox>
                    <div class="yours messages">
                      <div class="message last">{data[0]}</div>
                    </div>
                  </ChatBox>
                </ChatContainer>
              </>
            ) : (
              <div class="mine messages">
                <div class="message last">Dude</div>
              </div>
            )}
          </div>
        ))}
      </ChatContent>

      <ChatForm onSubmit={sendMessage}>
        <StyledTextarea
          required
          placeholder="메세지를 입력하세요(최대 100자)"
          value={myMessage}
          onChange={changeMessage}
        />
        <Button width="50px" height="50px" background="none" type="submit">
          <SendIcon />
        </Button>
      </ChatForm>
    </Container>
  );
}

export default ChatBot;
