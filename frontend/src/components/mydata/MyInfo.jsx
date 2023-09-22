import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { ChangePassword, GetUser } from "../../api/mypage/UserInformation";
import { width } from "@mui/system";
import ChangePwd from "./ChangePwd";

//정보박스
const InfoBox = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

//맨위 문구박스
const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const InfoTextBox = styled.p`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

//정보변경 박스
const FormBox = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
`;

function MyInfo() {
  const [mode, setMode] = useState(0);
  const [info, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    regionKey: null,
    age: null,
  });

  //영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;
  const [isPasswordValid, setPasswordValid] = useState(false);

  const backMypage = () => {
    window.location.reload();
  };

  const userInfo = async () => {
    const res = await GetUser(sessionStorage.getItem("id"));
    setInfo(res.data);
  };

  const changeMode = (props) => {
    setMode(props);
  };

  const changeRegion = () => {};
  const changeSafe = () => {};

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <>
      <InfoBox>
        <TextBox>
          <p>{info.name}님의 정보</p>
          <Button onClick={backMypage}>뒤로 돌아가기</Button>
        </TextBox>
        <InfoTextBox>이메일 : {info.email}</InfoTextBox>
        <InfoTextBox>
          비밀번호 : {info.password}
          <Button onClick={() => changeMode(1)}>비밀번호변경</Button>
        </InfoTextBox>
        <InfoTextBox>
          거주지 : {info.regionKey}
          <Button onClick={() => changeMode(2)}>거주지 변경</Button>
        </InfoTextBox>
        <InfoTextBox>생년월일 : {info.age}</InfoTextBox>
        <InfoTextBox>
          보호종료일 : 보호종료일
          <Button onClick={() => changeMode(3)}>보호종료일 변경</Button>
        </InfoTextBox>
      </InfoBox>
      {mode === 0 && null}
      {mode === 1 && <ChangePwd />}
      {mode === 2 && (
        <InfoBox>
          <TextBox>
            <p>거주지 변경</p>
            <Button onClick={changeRegion}>변경완료</Button>
          </TextBox>
          <InfoTextBox>새로운 거주지 : {info.email}</InfoTextBox>
        </InfoBox>
      )}
      {mode === 3 && (
        <InfoBox>
          <TextBox>
            <p>보호종료일 변경</p>
            <Button onClick={changeSafe}>변경완료</Button>
          </TextBox>
          <InfoTextBox>새로운 보호종료일 : {info.email}</InfoTextBox>
        </InfoBox>
      )}
    </>
  );
}

export default MyInfo;
