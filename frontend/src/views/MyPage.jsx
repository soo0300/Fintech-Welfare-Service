import React, { useState } from "react";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import MyData from "../components/mydata/MyData";
import MyInfo from "../components/mydata/MyInfo";
import Nav from "../components/Nav/Nav";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { ReactComponent as AvartarIcon } from "../assets/img/Avartar.svg";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
`;
const Content = styled.div`
  width: 90%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MyPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleInfo = () => {
    setShowInfo(true);
  };

  //로그아웃
  const handlelogout = () => {
    localStorage.clear();
    window.alert("로그아웃 되었습니다.");
    navigate("/login");
  };
  return (
    <>
      <Header>
        <Logo></Logo>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AvartarIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> 신대혁님
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleInfo}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            정보수정
          </MenuItem>
          <MenuItem onClick={handlelogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      </Header>
      <Content>{showInfo ? <MyInfo /> : <MyData />}</Content>
      <Nav></Nav>
    </>
  );
}

export default MyPage;
