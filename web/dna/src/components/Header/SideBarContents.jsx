import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const SideBarContents = ({ close }) => {
  const closeMenu = () => {
    close(true);
  };

  return (
    <SideBarContentBox>
      <UserDataBox>
        <ImgBox>
          <div className="innerImgBox">
            <Link to="/login" onClick={closeMenu}>
              <img src={"images/User.png"} alt="유저사진" />
            </Link>
          </div>
        </ImgBox>
        <Link to="/login" className="goTOLogin" onClick={closeMenu}>
          로그인이 필요합니다.
        </Link>
      </UserDataBox>
      <MenuBox>
        <Link to="/" onClick={closeMenu}>
          서비스소개
        </Link>
        <Link to="/rhythm" onClick={closeMenu}>
          측정데이터확인
        </Link>
        <Link to="/calender" onClick={closeMenu}>
          캘린더
        </Link>
        <Link to="/hospital" onClick={closeMenu}>
          주변병원정보
        </Link>
        <Link to="/community" onClick={closeMenu}>
          커뮤니티
        </Link>
      </MenuBox>
    </SideBarContentBox>
  );
};

export default SideBarContents;

const SideBarContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDataBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #6ebcff;
  height: 220px;
  border-radius: 30px 0 0 0;
  border-top: 1px solid gray;

  & .goTOLogin {
    margin: 15px 0 0 40px;
    color: black;
    &:hover {
      color: white;
      font-size: 17px;
    }
  }
`;

const ImgBox = styled.div`
  display: table;
  text-align: center;
  width: 100px;
  height: 100px;
  margin: 40px 0 0 40px;
  border-radius: 50px;
  overflow: hidden;

  & .innerImgBox {
    display: table-cell;
    vertical-align: middle;
  }
  & img {
    max-width: 100px;
    max-height: 100px;
    cursor: pointer;
  }
`;

const MenuBox = styled.div`
  margin: 40px 0 0 20px;
  display: flex;
  flex-direction: column;

  & a {
    color: black;
    font-size: 20px;
    height: 70px;
    &:hover {
      color: #40a3f9;
      font-size: 21px;
    }
  }
`;