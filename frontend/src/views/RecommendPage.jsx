import { React, useState } from "react";
import Header from "../components/header/Header";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/img/Search_icon.svg";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import Button from "../components/button/Button";
import Card from "../components/card/Card";

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
  width: 31vh;
  height: 4vh;
  border-radius: 30px;
  font-size: 2vh;

  // 아이콘 때문에 가려지는 텍스트를 피하기 위해 padding-left 추가
  padding-left: 5vh;
`;

function SearchBar() {
  return (
    <SearchBarContainer>
      <StyledSearchIcon />
      <SearchInput placeholder="" />
    </SearchBarContainer>
  );
}

const TagContainer = styled.div`
  width: 38vh;
  height: 100%;
  background-color: #bddffa;
  border-radius: 10px;
  margin-top: 4vh;
  margin-bottom: 9vh;
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
  width: 38vh;
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

function Business() {
  return (
    <BusinessContainer>
      <BusinessHeader>
        <p>전국 지원 / 복지 사업</p>
        <PlusIcon width="7%" />
      </BusinessHeader>
      <HR />
      <CardContainer>
        <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
        <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
        <Card cardWidth="45%" cardHeight="23vh" posterWidth="3rem" />
      </CardContainer>
    </BusinessContainer>
  );
}

function RecommendPage() {
  return (
    <>
      <Header />
      <SearchBar />
      <Tag />
      <Business />
    </>
  );
}

export default RecommendPage;
