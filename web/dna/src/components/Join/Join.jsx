import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Join = () => {
  // 로그인 상태시 메인페이지로 우회
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      window.location.replace("/");
    }
  });
  return (
    <JoinBack>
      <JoinBox>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/WebLogo.png`} alt="" />
        </Link>
        <Outlet />
      </JoinBox>
    </JoinBack>
  );
};

export default Join;

const JoinBack = styled.div`
  background-color: whitesmoke;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999999;
`;

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 400px;
    margin: 30px 0 -10px 0;
  }
`;
