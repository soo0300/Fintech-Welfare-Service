import { React, useState, useEffect } from "react"; // useState import
import Nav from "../components/Nav/Nav";
import { styled } from "styled-components";
import Header from "../components/header/Header";
import Card from "../components/card/Card";

// Icon
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import { ReactComponent as WhitePlusIcon } from "../assets/img/Vector.svg";
import { ReactComponent as MinusIcon } from "../assets/img/minus.svg";

// API
import {
  GetMywelfare,
  GetReceive,
  GetExamine,
  GetFund,
} from "../api/welfare/MyWelfare";

// 사업을 넣는 박스를 갖는 컨테이너
const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: calc(100%-154px);
  /* padding-top: 30px; */
  padding-bottom: 94px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

// 카드를 넣었을 때와 안넣었을 때 박스 공통 설정
const BusinessBasicBox = styled.div`
  background-color: #fff;
  width: 100%;
  margin-bottom: 7%;
  border-radius: 10px;
`;

// 카드를 안넣었을 때 박스
const BusinessNothingBox = styled(BusinessBasicBox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// 카드를 넣었을 때 박스
const BusinessBox = styled(BusinessBasicBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BusinessBoxTop = styled.div`
  display: flex;
  width: 115%;
  justify-content: space-around;
  align-items: center;
`;

// 맞춤 지원 사업
const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
`;

const CustomCardBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
  flex-wrap: wrap;
`;

const Money = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
  flex-wrap: wrap;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
`;

const HR = styled.hr`
  width: 83%;
`;

// 넣은 심사사업이 없을 때
function ExamineNothing(props) {
  return (
    <>
      <BusinessNothingBox>
        <Text>
          <p style={{ color: props.titleColor }}>{props.title}</p>을 넣어주세요
        </Text>
        <WhitePlusIcon width="10%" />
      </BusinessNothingBox>
    </>
  );
}

// 넣은 지원사업이 없을 때
function ReceiveNothing(props) {
  return (
    <>
      <BusinessNothingBox>
        <Text>
          <p style={{ color: props.titleColor }}>{props.title}</p>을 넣어주세요
        </Text>
        <WhitePlusIcon width="10%" />
      </BusinessNothingBox>
    </>
  );
}

// 심사 받고 있는 사업
function ExamineBody(props) {
  // 플러스 마이너스 버튼을 통해 보여지고 안보여지고
  const [isCardVisible, setCardVisible] = useState(false); // State for Card visibility

  return (
    <BusinessBox>
      <BusinessBoxTop>
        <p style={{ color: props.titleColor }}>{props.title}</p>
        {isCardVisible ? (
          <MinusIcon
            width="6%"
            onClick={() => setCardVisible(!isCardVisible)}
          />
        ) : (
          <PlusIcon width="6%" onClick={() => setCardVisible(!isCardVisible)} />
        )}{" "}
      </BusinessBoxTop>
      <HR />
      <Money>
        <p>매 달</p>
        <p style={{ color: props.moneyColor }}>{props.money}₩</p>
        <p>{props.comment}</p>
      </Money>
      {isCardVisible && (
        <CardContainer>
          {props.examine.map((welfare) => (
            <Card
              key={welfare.id}
              id={welfare.id}
              title={welfare.name}
              region={welfare.region_key}
              support_period={welfare.start_date}
            />
          ))}{" "}
        </CardContainer>
      )}
    </BusinessBox>
  );
}

// 지원 받고 있는 사업
function ReceiveBody(props) {
  // 플러스 마이너스 버튼을 통해 보여지고 안보여지고
  const [isCardVisible, setCardVisible] = useState(false); // State for Card visibility

  return (
    <BusinessBox>
      <BusinessBoxTop>
        <p style={{ color: props.titleColor }}>{props.title}</p>
        {isCardVisible ? (
          <MinusIcon
            width="6%"
            onClick={() => setCardVisible(!isCardVisible)}
          />
        ) : (
          <PlusIcon width="6%" onClick={() => setCardVisible(!isCardVisible)} />
        )}{" "}
      </BusinessBoxTop>
      <HR />
      <Money>
        <p>매 달</p>
        <p style={{ color: props.moneyColor }}>{props.money}₩</p>
        <p>{props.comment}</p>
      </Money>
      {isCardVisible && (
        <CardContainer>
          {props.receiveWelfares.map((welfare) => (
            <Card
              key={welfare.id}
              id={welfare.id}
              title={welfare.name}
              region={welfare.region_key}
              support_period={welfare.start_date}
            />
          ))}{" "}
        </CardContainer>
      )}
    </BusinessBox>
  );
}

// 맞춤 지원 사업
function CustomBusinesss() {
  const [welfareData, setWelfareData] = useState([]);

  // 로컬 스토리지에서 id가져오기
  useEffect(() => {
    const fetchWelfareData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        // 가져왔다면, id를 이용해서 API보내기
        try {
          const response = await GetMywelfare({ user_id: userId });
          setWelfareData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWelfareData();
  }, []);

  return (
    <CustomContainer>
      <p>맞춤 지원 사업</p>
      <HR />
      <CustomCardBox>
        {welfareData.map((welfare) => (
          <Card
            key={welfare.id}
            id={welfare.id}
            title={welfare.name}
            region={welfare.region_key}
            support_period={welfare.start_date}
          />
        ))}
      </CustomCardBox>
    </CustomContainer>
  );
}

// 페이지 전체
function Business() {
  const [examine, setExamine] = useState([]);
  const [receive, setReceive] = useState([]);
  const [money, setMoney] = useState();

  // 공통으로 사용하는 데이터 fetch 함수
  const fetchData = async (apiFunc, setStateFunc) => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await apiFunc({ user_id: userId });
        setStateFunc(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData(GetExamine, setExamine); // 심사 중인 지원 사업 데이터 fetch
    fetchData(GetReceive, setReceive); // 지원 받고 있는 사업 정보 fetch
    fetchData(GetFund, setMoney); // Money fetch
  }, []);

  console.log(money);

  return (
    <>
      <Header />
      <BusinessContainer>
        {examine.length > 0 ? (
          <ExamineBody
            examine={examine}
            title="심사 중인 지원 사업"
            titleColor="#F66262"
            money={money.pre_fund}
            moneyColor="#30BC19"
            comment="더 받을 수 있습니다."
          />
        ) : (
          <ExamineNothing title="심사 중인 지원 사업" titleColor="#F66262" />
        )}

        {receive.length > 0 ? (
          <ReceiveBody
            receiveWelfares={receive}
            title="지원 받고 있는 사업"
            titleColor="#006FFD"
            money={money.total_fund}
            moneyColor="#30BC19"
            comment="지원 받고 있습니다."
          />
        ) : (
          <ReceiveNothing title="지원 받고 있는 사업" titleColor="#006FFD" />
        )}

        <CustomBusinesss />
      </BusinessContainer>
    </>
  );
}

export default Business;
