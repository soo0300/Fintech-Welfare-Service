import { React, useState, useEffect } from "react";
import Header from "../components/header/Header";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/img/Search_icon.svg";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import Button from "../components/button/Button";
import Card from "../components/card/Card";
import Nav from "../components/Nav/Nav";
import RegionModal from "../components/modal/RegionModal";

// API
import { AllWelfare } from "../api/welfare/Welfare";

const RecommandPageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; // 상대적 위치 지정
  /* padding-top: 70px; */
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute; // 절대적 위치 지정
  left: 4%; // input 바의 왼쪽에서 약간 떨어진 위치에 배치
  width: 7%;
`;

const SearchInput = styled.input`
  width: 33vh;
  height: 4vh;
  border-radius: 30px;
  font-size: 2vh;

  // 아이콘 때문에 가려지는 텍스트를 피하기 위해 padding-left 추가
  padding-left: 5vh;
`;

function SearchBar({ userInput, setUserInput }) {
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <SearchBarContainer>
      <StyledSearchIcon />
      <SearchInput value={userInput} onChange={handleInputChange} />
    </SearchBarContainer>
  );
}

const TagContainer = styled.div`
  width: 90%;
  background-color: #bddffa;
  border-radius: 10px;
  margin-top: 4vh;
  margin-bottom: 4vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
`;

const HR = styled.hr`
  width: 83%;
  color: black;
`;

const tags1 = ["소득", "주거", "금융", "진학"];
const tags2 = ["취업", "건강", "법률", "기타"];

function Tag() {
  // 각 버튼의 활성/비활성 상태를 useState를 통해 관리
  const [tagState, setTagState] = useState({
    소득: false,
    주거: false,
    금융: false,
    진학: false,
    취업: false,
    건강: false,
    법률: false,
    기타: false,
  });

  // 버튼 클릭 핸들러
  const handleTagClick = (tag) => {
    // 현재 상태를 복사하여 새 객체를 생성
    const updatedTagState = { ...tagState };

    // 클릭한 버튼의 상태를 토글 (true -> false 또는 false -> true)
    updatedTagState[tag] = !updatedTagState[tag];

    // 변경된 상태로 업데이트
    setTagState(updatedTagState);
  };

  return (
    <TagContainer>
      <ButtonContainer>
        {tags1.map((tag) => (
          <Button
            key={tag}
            weight="bold"
            fontSize="2vh"
            width="8vh"
            background={tagState[tag] ? "primary" : "white"} // 상태에 따라 배경색 변경
            color={tagState[tag] ? "white" : "#000"} // 상태에 따라 글자색 변경
            onClick={() => handleTagClick(tag)} // 클릭 핸들러 연결
          >
            #{tag}
          </Button>
        ))}
      </ButtonContainer>
      <HR />
      <ButtonContainer>
        {tags2.map((tag) => (
          <Button
            key={tag}
            weight="bold"
            fontSize="2vh"
            width="8vh"
            background={tagState[tag] ? "primary" : "white"} // 상태에 따라 배경색 변경
            color={tagState[tag] ? "white" : "#000"} // 상태에 따라 글자색 변경
            onClick={() => handleTagClick(tag)} // 클릭 핸들러 연결
          >
            #{tag}
          </Button>
        ))}
      </ButtonContainer>
    </TagContainer>
  );
}

const BusinessContainer = styled.div`
  background-color: #fff;
  width: 90%;
  border-radius: 10px;
`;

const BusinessHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 6%;
`;

function Business({ userInput }) {
  // 카드 안에 내용
  const [welfares, setWelfares] = useState([]);
  const [filteredWelfares, setFilteredWelfares] = useState([]);

  // RegionModal의 상태 관리
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [regionKey, setRegionKey] = useState("전국");

  useEffect(() => {
    const fetchWelfares = async () => {
      const data = await AllWelfare();
      setWelfares(data);
      setFilteredWelfares(data);
    };

    fetchWelfares();
  }, []);

  // 이름 및 지역에 따른 필터링
  useEffect(() => {
    const searched = welfares.filter(
      (welfare) =>
        welfare.name.includes(userInput) &&
        (regionKey === "전국" || welfare.region_key === regionKey)
    );
    setFilteredWelfares(searched);
  }, [userInput, regionKey]);

  console.log(filteredWelfares);

  return (
    <BusinessContainer>
      <BusinessHeader>
        <p>{regionKey} 지원 / 복지 사업</p>
        <PlusIcon onClick={() => setIsRegionModalOpen(true)} width="7%" />
      </BusinessHeader>
      <HR />
      {isRegionModalOpen && (
        <RegionModal
          onClose={() => setIsRegionModalOpen(false)}
          setRegionKeyInParent={setRegionKey}
        />
      )}
      <CardContainer>
        {filteredWelfares.map((welfare) => (
          <Card
            key={welfare.id}
            // welfare props
            id={welfare.id}
            title={welfare.name}
            region={welfare.region_key}
            support_period={welfare.start_date}
          />
        ))}
      </CardContainer>
    </BusinessContainer>
  );
}

function RecommendPage() {
  const [userInput, setUserInput] = useState("");

  return (
    <>
      <Header />
      <RecommandPageBody>
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
        <Tag />
        <Business userInput={userInput} />
      </RecommandPageBody>
      <Nav />
    </>
  );
}

export default RecommendPage;
