import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";
import { ReactComponent as IntroPicture } from "../assets/img/Intro_picture.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroContainer = styled(motion.div)`
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20vh;
  font-size: 50px;
  font-weight: bolder;
  text-align: center;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 35vw;
  max-width: 100%;
`;

const BoxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
};

const animationDuration = 2;

const Intro = () => {
  const [showing, setShowing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowing(true);
    }, animationDuration * 1000);

    return () => {
      clearTimeout(showTimeout);
    };
  }, []);

  const handleClick = () => {
    setShowing(false);
  };

  const handleExitComplete = () => {
    navigate("/login");
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {showing ? (
        <IntroContainer
          className="IntroContainer"
          variants={BoxVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          transition={{
            duration: animationDuration,
          }}
          onClick={handleClick}
        >
          <TitleBox className="TitleBox">
            <LogoImg src={Logo} alt="Logo" />
            함께, 드림
          </TitleBox>
          <IntroPicture />
        </IntroContainer>
      ) : null}
    </AnimatePresence>
  );
};

export default Intro;
