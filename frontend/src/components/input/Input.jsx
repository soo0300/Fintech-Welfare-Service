import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid;
  background-color: var(--white);
  color: var(--black);
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderradius};
  ::placeholder {
    ${(props) => props.placeholder};
  }
  &:focus {
    outline: none;
  }
  bottom: ${(props) => props.bottom};
  position: ${(props) => props.position};
`;

const Input = (props) => {
  const {
    type,
    width,
    height,
    placeholder,
    margin,
    padding,
    onChange,
    id,
    value,
    disabled,
    borderradius,
    bottom,
    position,
  } = props;

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      onChange={onChange}
      id={id}
      value={value}
      disabled={disabled}
      borderradius={borderradius}
      bottom={bottom}
      position={position}
    />
  );
};

export default Input;
