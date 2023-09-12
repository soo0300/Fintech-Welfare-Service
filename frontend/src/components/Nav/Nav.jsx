import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ChatbotIcon } from "../../assets/img/Chatbot_icon.svg";
import { ReactComponent as HomeIcon } from "../../assets/img/Home_icon.svg";
import { ReactComponent as MypageIcon } from "../../assets/img/Mypage_icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/Search_icon.svg";
import Button from "../button/Button";

const StyledNav = styled.div`
  background: white;
  width: 100%;
  height: 10%;
  bottom: 0;
  position: fixed;
  border-top: 1px solid;
  border-color: black;
  box-shadow: 0px -1px 10px 1px grey;
  display: flex;
  justify-content: space-evenly;
`;

const navIcons = [
  { icon: HomeIcon, link: "business" },
  { icon: ChatbotIcon, link: "chatbot" },
  { icon: SearchIcon, link: "recommend" },
  { icon: MypageIcon, link: "mypage" },
];

const Nav = () => {
  const navigate = useNavigate();
  const movepage = (link) => {
    navigate(`/${link}`);
  };

  return (
    <StyledNav>
      {navIcons.map((navIcon, index) => (
        <Button
          key={index}
          width="50px"
          height="50px"
          background="none"
          onClick={() => movepage(navIcon.link)}
        >
          <navIcon.icon />
        </Button>
      ))}
    </StyledNav>
  );
};

export default Nav;
