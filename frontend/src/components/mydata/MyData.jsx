import React, { useEffect } from "react";
import styled from "styled-components";
// import Button from "../button/Button";
import { useState } from "react";
import Loading from "../loading/Loading";
import { BarChart } from "@mui/x-charts/BarChart";
import { ReactComponent as RefreshIcon } from "../../assets/img/Refresh.svg";
import { ReactComponent as ThreeDotIcon } from "../../assets/img/ThreeDot.svg";
import { ReactComponent as MailIcon } from "../../assets/img/MailIcon.svg";
import { Button } from "@mui/material";
import { BankAll, RefreshUser } from "../../api/mydata/MydataAccount";

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

//알림 점3개아이콘
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
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState(localStorage.getItem("myData"));

  const month = new Date().getMonth();

  const refreshHandler = async () => {
    setLoading(true);
    const res = await RefreshUser();
    localStorage.setItem("myData", true);
    console.log(res);
    setTimeout(() => {
      setLoading(false);
      setMyData(localStorage.getItem("myData"));
    }, 3000);
  };

  const alertHandler = () => {
    setShowAlert(!showAlert);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (myData === "true") {
        try {
          const res = await BankAll();
          setMessage(res.data.list);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [myData]);

  return (
    <>
      {!showAlert &&
        (loading ? (
          <ButtonBox>
            <Loading />
          </ButtonBox>
        ) : myData === "true" ? (
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
            <Button variant="contained" size="large" onClick={refreshHandler}>
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
        message.length > 0 &&
        message.map((alert) => (
          <AlertBox key={alert.idx}>
            <AlertMail>
              <Mail />
            </AlertMail>

            <AlertTextBox>
              <AlertText>
                <div>{alert.tranDesc}</div>
              </AlertText>
              <AlertMoney>
                <MoneyText>{alert.tranAmt}₩</MoneyText>이 {alert.type.desc}
                되었습니다.
              </AlertMoney>
            </AlertTextBox>
          </AlertBox>
        ))
      )}
    </>
  );
}

export default MyData;
