import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  background-color: none;
  width: 35vw;
  height: 160px;
  font-size: 12px;
  color: black;
  overflow-y: scroll;
`;

const DropdownUl = styled.ul`
  list-style: none;
  height: auto;
  max-height: 100%;
`;

const DropdownItem = styled.li`
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
  height: 20px;
`;
const Dropdown = ({ items, onItemClick }) => {
  return (
    <DropdownContainer className="DropDownContainer">
      <DropdownUl className="DropdownUl">
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => onItemClick(item)}
            className={item}
            color="black"
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownUl>
    </DropdownContainer>
  );
};

export default Dropdown;
