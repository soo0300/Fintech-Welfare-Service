import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  background: ${(props) =>
    props.background ? `var(--${props.background})` : `var(--white)`};
  color: var(--black);
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline: none;
  }
  ::placeholder {
    ${(props) => props.placeholder};
  }
  &:focus {
    outline: none;
  }
`;

const Input = (props) => {
  const {
    type,
    width,
    height,
    placeholder,
    background,
    margin,
    padding,
    onChange,
    id,
    value,
    borderRadius,
    disabled,
  } = props;

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      width={width}
      height={height}
      background={background}
      margin={margin}
      padding={padding}
      onChange={onChange}
      id={id}
      value={value}
      disabled={disabled}
      borderRadius={borderRadius}
    />
  );
};

export default Input;
