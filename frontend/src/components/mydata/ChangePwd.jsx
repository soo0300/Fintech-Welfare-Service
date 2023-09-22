import { Button, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const InfoTextBox = styled.p`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

//정보변경 박스
const FormBox = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
`;

const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;
function ChangePwd() {
  const changePassword = (e) => {
    e.preventDefault();
    // if (info.password === e.target[1].value) {
    //   console.log(e);
    // } else {
    //   console.log("현재비밀번호 틀림");
    // }
  };
  return (
    <>
      <FormBox onSubmit={changePassword}>
        <TextBox>
          <p>비밀번호 변경</p>
          <Button type="submit">변경완료</Button>
        </TextBox>
        {/* <InfoTextBox>
          현재 비밀번호 :
          <TextField
            id="curPwd"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            // onChange={changeData}
          />
        </InfoTextBox>
        <InfoTextBox>
          새로운 비밀번호 :
          <TextField
            id="pwd"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            // onChange={changeData}
          />
        </InfoTextBox>
        <InfoTextBox>
          비밀번호 확인 :
          <TextField
            id="pwdCheck"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            // onChange={changeData}
          />
        </InfoTextBox> */}
      </FormBox>
    </>
  );
}

export default ChangePwd;
