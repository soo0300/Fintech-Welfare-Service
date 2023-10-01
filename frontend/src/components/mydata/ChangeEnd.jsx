import { Button, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const InfoTextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

//정보변경 박스
const FormBox = styled.form`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
  box-shadow: 3px 3px 3px 3px lightgray;
`;

const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

function ChangeEnd() {
  const submitRegion = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <FormBox onSubmit={submitRegion}>
        <TextBox>
          <p>보호종료일 변경하기</p>
          <Button type="submit">변경하기</Button>
        </TextBox>
        <InfoTextBox>
          새로운 보호종료일 :
          <TextField
            id="curPwd"
            size="small"
            sx={{ width: "50%" }}
            required
            type="date"
          />
        </InfoTextBox>
      </FormBox>
    </>
  );
}

export default ChangeEnd;
