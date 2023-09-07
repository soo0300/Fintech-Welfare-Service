import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledNav = styled.div`
  background: black;
  width: 100%;
  height: 100px;
  bottom: 0;
  position: fixed;
`;

const Nav = () => {
  const navigate = useNavigate();
  const movepage = (link) => {
    navigate(`/${link}`);
  };
  return (
    <StyledNav>
      <button
        onClick={() => {
          movepage("");
        }}
      >
        인트로
      </button>
      <button
        onClick={() => {
          movepage("business");
        }}
      >
        비지니스
      </button>
      <button
        onClick={() => {
          movepage("chatbot");
        }}
      >
        챗봇
      </button>
      <button
        onClick={() => {
          movepage("mypage");
        }}
      >
        마이페이지
      </button>
      <button
        onClick={() => {
          movepage("recommend");
        }}
      >
        추천
      </button>
    </StyledNav>
  );
};

export default Nav;
