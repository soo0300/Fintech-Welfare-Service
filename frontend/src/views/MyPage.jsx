import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { GetUser } from "../api/mypage/UserInformation";
import ChangePwd from "../components/mydata/ChangePwd";
import ChangeRegion from "../components/mydata/ChangeRegion";
import ChangeEnd from "../components/mydata/ChangeEnd";
import jsonData from "../assets/data/region.json";
import Header from "../components/header/Header";

//정보박스
const InfoBox = styled.div`
  width: 90%;
  margin-top: 70px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

//박스안의 맨위 문구박스
const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const InfoTextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

function MyPage() {
  const [mode, setMode] = useState(0);
  const [info, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    regionKey: null,
    age: null,
  });

  const userInfo = async () => {
    const res = await GetUser(localStorage.getItem("id"));
    const secondRegion = jsonData.find(
      (item) => item.region_key === res.data.regionKey
    );
    const firstRegion = jsonData.find(
      (item) => item.region_key === secondRegion.parent_key
    );
    setInfo({
      ...res.data,
      regionKey: `${firstRegion.name}  ${secondRegion.name}`,
    });
  };

  const changeMode = (props) => {
    setMode(props);
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <>
      <Header />
      <InfoBox>
        <TextBox>
          <p>{info.name}님의 정보</p>
        </TextBox>
        <InfoTextBox>
          {info.email}
          <Button onClick={() => changeMode(1)} sx={{ padding: 0 }}>
            비밀번호변경
          </Button>
        </InfoTextBox>

        <InfoTextBox>
          거주지 : {info.regionKey}
          <Button onClick={() => changeMode(2)} sx={{ padding: 0 }}>
            거주지 변경
          </Button>
        </InfoTextBox>
        <InfoTextBox>나이 : 만 {info.age}세</InfoTextBox>
        <InfoTextBox>
          보호종료일 : 보호종료일
          <Button onClick={() => changeMode(3)} sx={{ padding: 0 }}>
            보호종료일 변경
          </Button>
        </InfoTextBox>
      </InfoBox>
      {mode === 0 && null}
      {mode === 1 && <ChangePwd curPwd={info.password} />}
      {mode === 2 && <ChangeRegion />}
      {mode === 3 && <ChangeEnd />}
    </>
  );
}

export default MyPage;
