import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import styled from "styled-components";
import axios from "../../../axios";

const ChangePW = ({ setChangePwOpen }) => {
  const userData = JSON.parse(localStorage.getItem("loginData"));

  // 비밀번호 유효성 검사 함수 시작 ------------------------------------------------------------------------------------
  // 기존 비밀번호 관련 변수
  const [pw, setPw] = useState("");
  const [passPW, setPassPW] = useState();
  const [checkPWText, setCheckPWText] = useState("");
  const checkPW = () => {
    if (pw == "") {
      setPassPW();
      setCheckPWText();
    } else {
    }
  };
  useEffect(() => {
    checkPW();
  }, [pw]);

  // 로그인 함수
  const checkOldPw = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", { user: "mem", id: userData.id, pw: pw })
      .then((res) => {
        const loginData = res.data.loginResult;
        if (typeof loginData == "object") {
          setPassPW(true);
          setCheckPWText("* 비밀번호가 일치합니다.");
          changePW();
        } else if (loginData) {
          setPassPW(false);
          setCheckPWText("* 비밀번호가 일치하지않습니다.");
        } else {
          alert("알 수 없는 이유로 오류가 발생하였습니다.");
        }
      });
  };

  // 변경할 비밀번호 관련 변수
  const [changePw, setChangePw] = useState("");
  const [passChangePW, setPassChangePW] = useState();
  const [checkChangePWText, setCheckChangePWText] = useState("");
  const checkChangePW = () => {
    if (changePw == "") {
      setPassChangePW();
      setCheckChangePWText();
    } else if (changePw == pw) {
      setPassChangePW(false);
      setCheckChangePWText("* 기존 비밀번호와 다른 비밀번호를 입력해주세요.");
    } else if (changePw.length >= 8) {
      setPassChangePW(true);
      setCheckChangePWText();
    } else {
      setPassChangePW(false);
      setCheckChangePWText("* 올바른 비밀번호를 입력해주세요.");
    }
  };
  useEffect(() => {
    checkChangePW();
  }, [changePw]);

  // 비밀번호 확인 관련 변수
  const [rePw, setRePw] = useState("");
  const [passRePW, setPassRePW] = useState();
  const [checkRePWText, setCheckRePWText] = useState("");
  const checkRePW = () => {
    if (rePw == "") {
      setPassRePW();
      setCheckRePWText();
    } else if (changePw == rePw && rePw.length >= 8) {
      setPassRePW(true);
      setCheckRePWText();
    } else {
      setPassRePW(false);
      setCheckRePWText("* 비밀번호가 일치하는지 확인해주세요.");
    }
  };
  useEffect(() => {
    checkRePW();
  }, [rePw]);
  // 비밀번호 유효성 검사 함수 끝-----------------------------------------------------------------------

  // 비밀번호 변경 함수 시작----------------------------------------------------------------------------
  const changePW = () => {
    if (passChangePW && passRePW) {
      axios
        .post("/user/changePw", {
          id: userData.id,
          changePw: changePw,
        })
        .then((res) => {
          if (res.data.changePwResult) {
            setChangePwOpen(false);
            alert("비밀번호 변경이 완료 되었습니다.");
          }
        });
    } else {
      alert("유효한 비밀번호를 설정해주세요.");
    }
  };
  // 비밀번호 변경 함수 끝------------------------------------------------------------------------------

  // 모달 코드 시작------------------------------------------------------------------------------------
  // 모달 끄기
  const closeChangePw = () => {
    setChangePwOpen(false);
    alert("비밀번호 변경이 취소 되었습니다.");
  };

  // 모달 외부 클릭 시 끄기
  const changePwRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (changePwRef.current && !changePwRef.current.contains(event.target)) {
        setChangePwOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });
  // 모달 코드 끝-------------------------------------------------------------------------------------

  return (
    <ChangePWBox ref={changePwRef}>
      <img src={"/images/WebLogo.png"} alt="리듬케어 로고" />
      <ChangePwInput>
        <Title>기존 비밀번호 입력 후 변경할 비밀번호를 입력해주세요.</Title>

        <Input>
          <CheckBox>
            {passPW == null ? (
              <RiCheckboxBlankCircleLine className="init" />
            ) : (
              <>
                {passPW ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <AiOutlineCloseCircle className="warn" />
                )}
              </>
            )}
          </CheckBox>
          <input
            className="pwInput"
            type="password"
            placeholder="기존 비밀번호"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </Input>
        {passPW ? (
          <Passed>{checkPWText}</Passed>
        ) : (
          <Warning>{checkPWText}</Warning>
        )}

        <Input>
          <CheckBox>
            {passChangePW == null ? (
              <RiCheckboxBlankCircleLine className="init" />
            ) : (
              <>
                {passChangePW ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <AiOutlineCloseCircle className="warn" />
                )}
              </>
            )}
          </CheckBox>
          <input
            className="pwInput"
            type="password"
            placeholder="변경할 비밀번호 (8자리 이상) "
            value={changePw}
            onChange={(e) => {
              setChangePw(e.target.value);
            }}
          />
        </Input>

        <Warning>{checkChangePWText}</Warning>

        <Input>
          <CheckBox>
            {passRePW == null ? (
              <RiCheckboxBlankCircleLine className="init" />
            ) : (
              <>
                {passRePW ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <AiOutlineCloseCircle className="warn" />
                )}
              </>
            )}
          </CheckBox>
          <input
            className="pwInput"
            type="password"
            placeholder="비밀번호 확인"
            value={rePw}
            onChange={(e) => {
              setRePw(e.target.value);
            }}
          />
        </Input>

        <Warning>{checkRePWText}</Warning>
      </ChangePwInput>
      <div className="btnBox">
        <button onClick={checkOldPw}>변경</button>
        <button onClick={closeChangePw}>취소</button>
      </div>
    </ChangePWBox>
  );
};

export default ChangePW;

const ChangePWBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 550px;
  z-index: 99999999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: whitesmoke;
  border: 1px solid rgba(0, 0, 0, 0.253);
  border-radius: 10px;
  box-shadow: 0 0 2cqi rgba(41, 41, 41, 0.3);
  padding-bottom: 15px;

  @media only screen and (max-width: 430px) {
    width: 90%;
  }
  & .btnBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    & button {
      color: white;
      font-size: 15px;
      border-radius: 10px;
      box-shadow: none;
      height: 40px;
      width: 70%;
      margin: 8px 8px 10px 8px;
      background-color: #2e2288;
      border: none;
      cursor: pointer;

      @media only screen and (max-width: 430px) {
        width: 80%;
      }
    }
  }

  & img {
    width: 90%;
    margin: 10px 0 -10px 0;
  }

  & input {
    height: 50px;
    width: 80%;
    margin: 5px;
    border: none;
    border-radius: 0 10px 10px 0;
    background-image: url("/images/User");
    background-repeat: no-repeat;
    background-size: 32px;
    background-position: 10px center;
  }

  & input::placeholder {
    color: #bdbdbd;
    font-size: 14px;
  }

  & input:focus {
    outline: none;
  }
`;

const Title = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
`;

const ChangePwInput = styled.div`
  height: 600px;
  margin-bottom: -200px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Warning = styled.div`
  padding-left: 15px;
  margin-bottom: 10px;
  height: 15px;
  color: red;
  font-size: 12px;
`;

const Passed = styled.div`
  padding-left: 15px;
  margin-bottom: 10px;
  height: 15px;
  color: green;
  font-size: 12px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: -5px;
  height: 52px;
  width: 40px;
  font-size: 25px;
  background-color: white;
  & .init {
    color: #bdbdbd;
  }
  & .pass {
    color: green;
  }
  & .warn {
    color: red;
  }
`;
