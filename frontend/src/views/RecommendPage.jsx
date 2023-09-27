import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/img/Search_icon.svg";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import Button from "../components/button/Button";
import Card from "../components/card/Card";
import Nav from "../components/Nav/Nav";
import Logo from "../components/Logo/Logo";
import Header from "../components/header/Header";
import RegionModal from "../components/modal/RegionModal";
import jsonData from "../assets/data/region.json";

// API
import { AllWelfare } from "../api/welfare/Welfare";

const RecommandPageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 4%;
  width: 7%;
`;

const SearchInput = styled.input`
  width: 33vh;
  height: 4vh;
  border-radius: 30px;
  font-size: 2vh;
  padding-left: 5vh;
`;

const BlueText = styled.span`
  color: blue;
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

function Tag({ selectedTags, setSelectedTags }) {
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

  const handleTagClick = (tag) => {
    const updatedTagState = { ...tagState };
    updatedTagState[tag] = !updatedTagState[tag];
    setTagState(updatedTagState);

    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
            background={tagState[tag] ? "primary" : "white"}
            color={tagState[tag] ? "white" : "#000"}
            onClick={() => handleTagClick(tag)}
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
            background={tagState[tag] ? "primary" : "white"}
            color={tagState[tag] ? "white" : "#000"}
            onClick={() => handleTagClick(tag)}
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

function Business({ userInput, selectedTags }) {
  // 카드 안에 내용
  const [welfares, setWelfares] = useState([]);
  const [filteredWelfares, setFilteredWelfares] = useState([]);

  // RegionModal의 상태 관리
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [regionKey, setRegionKey] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchWelfares = async () => {
      const data = await AllWelfare();
      setWelfares(data);
      setFilteredWelfares(data);
    };

    fetchWelfares();
  }, []);

  useEffect(() => {
    // 이름 및 지역에 따른 필터링
    let searched = welfares.filter(
      (welfare) =>
        welfare.name.includes(userInput) &&
        (regionKey === "" || welfare.region_key === regionKey)
    );

    // 지역이 있을 때, 지역이름 p태그 안에 띄우기
    if (regionKey) {
      const curRegion = jsonData.find((item) => item.region_key === regionKey);
      setSelectedRegion(curRegion.name);
    } else {
      setSelectedRegion("전국");
    }
    // 선택된 해시태그로 더 필터링
    if (selectedTags.length > 0) {
      searched = searched.filter((welfare) =>
        selectedTags.some((tag) => welfare.welfare_type.includes(tag))
      );
    }

    setFilteredWelfares(searched);
  }, [userInput, regionKey, selectedTags, welfares]);

  return (
    <BusinessContainer>
      <BusinessHeader>
        <p>
          <BlueText>{selectedRegion ? selectedRegion : "전국"}</BlueText> 지원 /
          복지 사업
        </p>

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
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <>
      <Header />
      <RecommandPageBody>
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
        <Tag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <Business userInput={userInput} selectedTags={selectedTags} />
      </RecommandPageBody>
    </>
  );
}

export default RecommendPage;
