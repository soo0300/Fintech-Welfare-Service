import React from "react";
import Header from "../components/header/Header";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/img/Search_icon.svg";
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import Button from "../components/button/Button";

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; // 상대적 위치 지정
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute; // 절대적 위치 지정
  left: 1vh; // input 바의 왼쪽에서 약간 떨어진 위치에 배치
  width: 2.5vh;
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
  height: 17vh;
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
  return (
    <TagContainer>
      <ButtonContainer>
        {tags1.map((tag) => (
          <Button
            key={tag} // React가 각 항목을 식별할 수 있도록 key 속성 추가
            weight="bold"
            fontSize="2vh"
            width="8vh"
            background="#fff"
            color="#000"
          >
            #{tag}
          </Button>
        ))}
      </ButtonContainer>
      <HR />
      <ButtonContainer>
        {tags2.map((tag) => (
          <Button
            key={tag} // React가 각 항목을 식별할 수 있도록 key 속성 추가
            weight="bold"
            fontSize="2vh"
            width="8vh"
            background="#fff"
            color="#000"
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

function Business() {
  return (
    <BusinessContainer>
      <BusinessHeader>
        <p>전국 지원 / 복지 사업</p>
        <PlusIcon width="7%" />
      </BusinessHeader>
      <HR />
    </BusinessContainer>
  );
}

function RecommendPage() {
  return (
    <RecommendContainer>
      <Header />
      <SearchBar />
      <Tag />
      <Business />
    </RecommendContainer>
  );
}

export default RecommendPage;
