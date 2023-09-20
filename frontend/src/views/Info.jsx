import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Logo } from "../assets/img/Modified_logo.svg";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Dropdown from "../components/dropdown/Dropdown";
import { Signup } from "../api/mypage/User";
import { useLocation, useNavigate } from "react-router-dom";
import jsonData from "../assets/data/region.json";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  min-height: 100vh;
`;

const HeaderBox = styled.div`
  width: 70vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;
const LineBox = styled.div`
  width: 70vw;
  height: 2vh;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 50vh;
`;

const Line = styled.div`
  width: 70vw;
  height: 1px;
  background-color: gray;
`;
const LineStatus = styled(motion.div)`
  width: 35vw;
  height: 2px;
  background-color: black;
  position: absolute;
  left: 0;
`;
const FooterBox = styled.div`
  width: 70vw;
  height: 28vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BirthBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RegionBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const FirstKeyBox = styled.div`
  width: 35vw;
  display: flex;
  flex-direction: column;
`;
const SecondKeyBox = styled.div`
  width: 35vw;
  display: flex;
  flex-direction: column;
`;
const Info = () => {
  const [regionKey, setRegionKey] = useState();
  const [myData, setMydata] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, pwd } = location.state || {};
  const movePage = async (isMydata) => {
    if (isMydata) {
      setMydata(true);
    }
    const currentDate = new Date().getTime();
    const isEnded = selectedTimestamp < currentDate;
    const requestData = {
      name: name,
      email: email,
      password: pwd,
      region_key: regionKey,
      residence_info: residenceInfo,
      end_date: selectedTimestamp,
      is_ended: isEnded,
      my_data: myData,
    };
    console.log(requestData);
    // try {
    //   // API 요청
    //   const response = await Signup(requestData);

    //   // API 응답 처리
    //   if (response.status === 200) {
    //     console.log("회원가입 성공:", response.data);
    //     navigate("/business");
    //   } else {
    //     console.error("회원가입 실패:", response.data);
    //   }
    // } catch (error) {
    //   console.error("API 요청 오류:", error);
    //   // 에러 처리 로직 추가
    // }
  };
  const [residenceInfo, setResidenceInfo] = useState("");
  const handleResidenceChange = (e) => {
    const residenceValue = e.target.value;
    setResidenceInfo(residenceValue);
  };

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [subRegions, setSubRegions] = useState([]);
  const [selectedRegionText, setSelectedRegionText] = useState("시/도 ▼");
  const [selectedSubRegionText, setSelectedSubRegionText] =
    useState("시/군/구 ▼");
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedRegionText(region);
    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
    const selectedRegionData = jsonData.filter(
      (item) => item.parent_key === curRegion.region_key
    );
    if (selectedRegionData) {
      const subRegionData = selectedRegionData.map((item) => item.name);
      setSubRegions(subRegionData);
    } else {
      setSubRegions([]);
    }
    setIsFirstDropdownView(false);
  };

  const handleSubRegionSelect = (region) => {
    setSelectedSubRegionText(region);
    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
    setIsSecondDropdownView(false);
  };

  useEffect(() => {
    const filteredNames = jsonData.slice(0, 17).map((item) => item.name);
    setRegions(filteredNames);
  }, []);

  // 날짜를 저장할 상태 변수
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFirstDropdownView, setIsFirstDropdownView] = useState(false);
  const [isSecondDropdownView, setIsSecondDropdownView] = useState(false);
  const [selectedTimestamp, setSelectedTimeStamp] = useState();

  // 날짜가 변경될 때 호출되는 함수
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTimeStamp(new Date(e.target.value).getTime());
  };

  const handleClickFirstDropdown = () => {
    setIsFirstDropdownView(!isFirstDropdownView);
  };

  const handleClickSecondDropdown = () => {
    console.log(selectedRegion);
    setIsSecondDropdownView(!isSecondDropdownView);
  };

  return (
    <InfoContainer>
      <HeaderBox>
        <Logo />
        <h1>&nbsp;함께, 드림</h1>
      </HeaderBox>
      <LineBox>
        <Line />
        <LineStatus
          initial={{ left: 0 }}
          animate={{ left: "35vw" }}
          transition={{ duration: 0.5 }}
        />
      </LineBox>
      <MainBox className="MainBox">
        <h2>
          맞춤 정보를 제공하기 위해
          <br /> 입력해주세요 :)
        </h2>
        <BirthBox>
          <Input
            type="number"
            width="135px"
            height="50px"
            color="gray"
            placeholder="생년월일"
            borderradius="none"
            border="none"
            borderBottom="1px solid gray"
            background="none"
            fontFamily="surround"
            onChange={handleResidenceChange}
          />
          -
          <Input
            type="number"
            width="20px"
            height="50px"
            color="gray"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            fontFamily="surround"
          />
          ●●●●●●
        </BirthBox>
        <DateBox>
          <Input
            type="date"
            width="270px"
            height="50px"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            fontSize="20px"
            fontFamily="surround"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </DateBox>
        <RegionBox>
          <FirstKeyBox>
            <Button
              text={selectedRegionText}
              onClick={handleClickFirstDropdown}
              background="none"
              color="black"
              width="35vw"
              fontFamily="surround"
            />
            {isFirstDropdownView && (
              <Dropdown items={regions} onItemClick={handleRegionSelect} />
            )}
          </FirstKeyBox>
          <SecondKeyBox>
            <Button
              text={selectedSubRegionText}
              onClick={handleClickSecondDropdown}
              background="none"
              color="black"
              width="35vw"
              fontFamily="surround"
            />
            {isSecondDropdownView && (
              <Dropdown
                items={subRegions}
                onItemClick={handleSubRegionSelect}
              />
            )}
          </SecondKeyBox>
        </RegionBox>
      </MainBox>
      <FooterBox>
        <Button
          onClick={() => movePage(true)}
          width="270px"
          fontSize="15px"
          background="success"
          fontFamily="surround"
        >
          마이데이터
        </Button>
        <Button
          onClick={() => movePage(false)}
          width="270px"
          fontSize="15px"
          fontFamily="surround"
        >
          회원가입
        </Button>
      </FooterBox>
    </InfoContainer>
  );
};
export default Info;
