import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  width: ${(props) =>
    props.type !== "icon" && !props.width ? "200px" : props.width};
  height: ${(props) =>
    props.type !== "icon" && !props.height ? "50px" : props.height};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  object-fit: ${(props) => (props.type === "icon" ? "fill" : "none")};
  padding: ${(props) => (props.type === "icon" ? "0" : props.padding)};
  margin: ${(props) => props.margin};
`;
const Button = (props) => {
  const { width, height, text, padding, margin, type, plus } = props;

  return (
    <StyledButton
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      type={type}
      plus={plus}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

// 버튼 종류 : 1. 일반 버튼(파란색) 2. +버튼 3.아이콘 버튼
