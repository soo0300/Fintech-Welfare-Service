import React from "react";
import styled from "styled-components";
// import Button from "../button/Button";
import { useState } from "react";
import Loading from "../loading/Loading";
import { BarChart } from "@mui/x-charts/BarChart";
import { ReactComponent as RefreshIcon } from "../../assets/img/Refresh.svg";
import { ReactComponent as ThreeDotIcon } from "../../assets/img/ThreeDot.svg";
import { ReactComponent as MailIcon } from "../../assets/img/MailIcon.svg";
import { Button } from "@mui/material";

//마이데이터 버튼박스
const ButtonBox = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 20px;
`;

//지원금현황 문구박스
const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

//차트박스
const ChartBox = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

//알림 문구박스
const AlertLine = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const ThreeDot = styled(ThreeDotIcon)`
  width: 30px;
  height: 30px;
`;

//알림메세지 한개 박스
const AlertBox = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
`;

//지원금현황 리프레시버튼
const Refresh = styled(RefreshIcon)`
  width: 30px;
  height: 30px;
`;

//기관,입금 전체박스
const AlertTextBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//입금액 박스
const AlertMoney = styled.div`
  width: 90%;
  height: 50px;
  border-top: 2px solid lightgray;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2vh;
`;

//메일아이콘 박스
const AlertMail = styled.div`
  width: 10%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
`;

//메일아이콘 크기
const Mail = styled(MailIcon)`
  width: 30px;
  height: 30px;
`;

//기관명 관리
const AlertText = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #f66262;
`;

//입금액 관리
const MoneyText = styled.p`
  color: #006ffd;
  margin-right: 10px;
`;

function MyData() {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [message, setMessage] = useState([
    { idx: 1, money: 5000, org: "광주" },
    { idx: 2, money: 10000000, org: "SSAFY" },
    { idx: 3, money: 500000, org: "돈줘요" },
  ]);

  const month = new Date().getMonth();

  const dataConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowChart(true);
    }, 3000);
  };

  const refreshHandler = () => {
    setLoading(true);
    // const res = await
    setTimeout(() => {
      setLoading(false);
      setShowChart(true);
    }, 3000);
  };

  const alertHandler = () => {
    setShowAlert(!showAlert);
  };

  return (
    <>
      {!showAlert &&
        (loading ? (
          <ButtonBox>
            <Loading />
          </ButtonBox>
        ) : showChart ? (
          <ChartBox>
            <TextBox>
              <p>월별 지원금 현황</p>
              <Button onClick={refreshHandler}>
                <Refresh />
              </Button>
            </TextBox>

            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: [`${month}월`, `${month + 1}월`, `${month + 2}월`],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [8, 9, 10],
                },
              ]}
              width={300}
              height={300}
            />
          </ChartBox>
        ) : (
          <ButtonBox>
            <Button variant="contained" size="large" onClick={dataConnect}>
              마이데이터 연결하기
            </Button>
            <span> *마이데이터를 연결하면 자동으로</span>
            <span>자신이 받고 있는 지원 사업을</span>
            <span>확인 할 수 있습니다.</span>
          </ButtonBox>
        ))}
      <AlertLine>
        <p>입금 내역</p>
        <Button onClick={alertHandler}>
          <ThreeDot />
        </Button>
      </AlertLine>
      {loading ? (
        <ButtonBox>
          <Loading />
        </ButtonBox>
      ) : (
        message.map((alert) => (
          <AlertBox key={alert.idx}>
            <AlertMail>
              <Mail />
            </AlertMail>

            <AlertTextBox>
              <AlertText>
                <div>{alert.org}</div>
              </AlertText>
              <AlertMoney>
                <MoneyText>{alert.money}₩</MoneyText>이 입금 되었습니다.
              </AlertMoney>
            </AlertTextBox>
          </AlertBox>
        ))
      )}
    </>
  );
}

export default MyData;
