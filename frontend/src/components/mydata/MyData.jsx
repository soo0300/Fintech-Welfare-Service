import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { useState } from "react";
import Loading from "../loading/Loading";
import { BarChart } from "@mui/x-charts/BarChart";
import { ReactComponent as RefreshIcon } from "../../assets/img/Refresh.svg";
import { ReactComponent as ThreeDotIcon } from "../../assets/img/ThreeDot.svg";
import { ReactComponent as MailIcon } from "../../assets/img/MailIcon.svg";

const ButtonBox = styled.div`
  width: 90%;
  height: 200px;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 20px;
`;

const ChartBox = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const AlertBox = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height: 100px;
  background-color: white;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
`;

const TextBox = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const AlertTextBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingBox = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height: 100px;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertMoney = styled.div`
  width: 90%;
  height: 50px;
  border-top: 2px solid lightgray;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AlertText = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #f66262;
`;

const AlertMail = styled.div`
  width: 10%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
`;

const IconButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-color: transparent;
  border: none;
`;

const Refresh = styled(RefreshIcon)`
  width: 100%;
  height: 100%;
`;

const Mail = styled(MailIcon)`
  width: 30px;
  height: 30px;
`;

const MoneyText = styled.p`
  color: #006ffd;
  margin-right: 10px;
`;

function MyData() {
  const [loading, setLoading] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [message, setMessage] = useState([
    { idx: 1, money: 5000, org: "광주" },
    { idx: 2, money: 10000000, org: "광주" },
  ]);

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

  const alertRefreshHandler = async () => {
    setAlertLoading(true);
    // const res = await
    setTimeout(() => {
      setAlertLoading(false);
    }, 3000);
  };

  return (
    <>
      {loading ? (
        <ButtonBox>
          <Loading />
        </ButtonBox>
      ) : showChart ? (
        <ChartBox>
          <TextBox>
            <p>월별 지원금 현황</p>
            <IconButton onClick={refreshHandler}>
              <Refresh />
            </IconButton>
          </TextBox>

          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["8월", "9월", "10월"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [8, 9, 10],
              },
            ]}
            width={400}
            height={400}
          />
        </ChartBox>
      ) : (
        <ButtonBox>
          <Button onClick={dataConnect}>마이데이터 연결하기</Button>
          <span> *마이데이터를 연결하면 자동으로</span>
          <span>자신이 받고 있는 지원 사업을</span>
          <span>확인 할 수 있습니다.</span>
        </ButtonBox>
      )}
      <TextBox>
        <p>알림</p>
        <IconButton onClick={alertRefreshHandler}>
          <ThreeDotIcon />
        </IconButton>
      </TextBox>
      {alertLoading ? (
        <LoadingBox>
          <Loading />
        </LoadingBox>
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
