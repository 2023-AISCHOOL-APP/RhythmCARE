import React, { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const SideBar = ({ width = 280, children, close, closeSet }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  //메뉴 닫기 함수
  const closeMenu = (e) => {
    if (e) {
      setX(-width);
      setOpen(false);
    }
  };
  useEffect(() => {
    closeMenu(close);
    closeSet(false);
  }, [close]);

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <SideBarBox>
      <SideBarView
        ref={side}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        {isOpen ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/Close.png`}
            onClick={toggleMenu}
            alt=""
            className="btnSideBar btnOn"
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/images/Menu.png`}
            onClick={toggleMenu}
            alt=""
            className="btnSideBar btnOff"
          />
        )}
        {/* 사이드바 컴포넌트 내부 값이 구현되는 위치 */}
        <SideBarContents>{children}</SideBarContents>
      </SideBarView>
    </SideBarBox>
  );
};

export default SideBar;

const SideBarBox = styled.div`
  /* background-color: aliceblue; */
`;

const SideBarView = styled.div`
  background-color: #ffffffdd;
  border-radius: 30px 0 0 30px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;

  & .btnSideBar {
    position: relative;
    top: 25px;
    left: -55px;
    width: 30px;
    height: 30px;
    z-index: 99;
    transition: 0.5s ease;
  }
  & .btnOff {
    left: -55px;
    /* background-color: white;
    border-radius: 50%; */
  }
  & .btnOn {
    left: 300px;
  }
`;

const SideBarContents = styled.div`
  position: relative;
  top: -35px;
  height: 100vh;
  width: 100%;
`;
