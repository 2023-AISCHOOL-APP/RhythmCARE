import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import axios from "../../axios";
import styled from "styled-components";

const LoginData = () => {
  const nav = useNavigate();

  // 아이디 관련 변수
  const [id, setId] = useState("");
  const [passID, setPassID] = useState();
  const [passDupID, setPassDupID] = useState(false);
  const [checkIDText, setCheckIDText] = useState("");
  const checkID = () => {
    setPassDupID(false);
    if (id.length > 4 && id.length < 11) {
      setPassID(true);
      setCheckIDText("* 아이디 중복 확인을 해주세요.");
    } else if (id == "") {
      setPassID();
      setCheckIDText();
    } else {
      setPassID(false);
      setCheckIDText("* 올바른 아이디를 입력해주세요.");
    }
  };
  useEffect(() => {
    checkID();
  }, [id]);

  const checkDupID = () => {
    axios.post("/user/join/idDupCheck", { id: id }).then((res) => {
      if (res.data.idDupResult) {
        setPassID(true);
        setPassDupID(true);
        setCheckIDText("* 사용가능한 아이디 입니다.");
      } else {
        setPassID(false);
        setCheckIDText("* 중복된 아이디 입니다.");
      }
    });
  };

  // 비밀번호 관련 변수
  const [pw, setPw] = useState("");
  const [passPW, setPassPW] = useState();
  const [checkPWText, setCheckPWText] = useState("");
  const checkPW = () => {
    if (pw.length >= 8) {
      setPassPW(true);
      setCheckPWText();
    } else if (pw == "") {
      setPassPW();
      setCheckPWText();
    } else {
      setPassPW(false);
      setCheckPWText("* 올바른 비밀번호를 입력해주세요.");
    }
  };
  useEffect(() => {
    checkPW();
  }, [pw]);

  // 비밀번호 확인 관련 변수
  const [rePw, setRePw] = useState("");
  const [passRePW, setPassRePW] = useState();
  const [checkRePWText, setCheckRePWText] = useState("");
  const checkRePW = () => {
    if (rePw == "") {
      setPassRePW();
      setCheckRePWText();
    } else if (pw == rePw && rePw.length >= 8) {
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

  // 닉네임 관련 변수
  const [nick, setNick] = useState("");
  const [passNick, setPassNick] = useState();
  const [passDupNick, setPassDupNick] = useState(false);
  const [checkNickText, setCheckNickText] = useState("");
  const checkNick = () => {
    setPassDupNick(false);
    if (nick.length > 1 && nick.length < 7) {
      setPassNick(true);
      setCheckNickText("* 닉네임 중복 확인을 해주세요.");
    } else if (nick == "") {
      setPassNick();
      setCheckNickText();
    } else {
      setPassNick(false);
      setCheckNickText("* 올바른 닉네임을 입력해주세요.");
    }
  };
  useEffect(() => {
    checkNick();
  }, [nick]);

  const checkDupNick = () => {
    axios.post("/user/join/nickDupCheck", { nick: nick }).then((res) => {
      if (res.data.nickDupResult) {
        setPassNick(true);
        setCheckNickText("* 사용가능한 닉네임 입니다.");
        setPassDupNick(true);
      } else {
        setPassNick(false);
        setCheckNickText("* 중복된 닉네임 입니다.");
      }
    });
  };

  const loginData = {
    id: id,
    pw: pw,
    nick: nick,
  };

  const nextToUserData = () => {
    if (passDupID && passDupNick && passPW && passRePW) {
      nav("/join/userdata", { state: { loginData: loginData } });
    } else {
      alert("회원가입 정보를 올바르게 입력해주세요.");
    }
  };

  // 이전 버튼으로 다시 돌아왔을때 기존 입력 데이터 유지
  const returnData = useLocation().state;
  useEffect(() => {
    if (returnData != null) {
      setId(returnData.loginData.id);
      setNick(returnData.loginData.nick);
      setPw(returnData.loginData.pw);
      setRePw(returnData.loginData.pw);
    }
  }, []);

  useEffect(() => {
    if (returnData != null) {
      checkDupID();
      checkDupNick();
    }
  }, [id, nick]);

  return (
    <LoginDataBox>
      <LoginDataInput>
        <Title>
          보호자와 기기 사용자가 같이 사용할 아이디 / 비밀번호입니다.
        </Title>
        <Input>
          <CheckBox>
            {passNick == null ? (
              <RiCheckboxBlankCircleLine className="init" />
            ) : (
              <>
                {passNick ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <AiOutlineCloseCircle className="warn" />
                )}
              </>
            )}
          </CheckBox>
          <input
            className="nickInput"
            type="text"
            placeholder="닉네임 (2~6글자)"
            value={nick}
            onChange={(e) => {
              setNick(e.target.value);
            }}
          />
          <DupCheckBox onClick={checkDupNick}>중복확인</DupCheckBox>
        </Input>
        {passNick ? (
          <Passed>{checkNickText}</Passed>
        ) : (
          <Warning>{checkNickText}</Warning>
        )}
        <Input>
          <CheckBox>
            {passID == null ? (
              <RiCheckboxBlankCircleLine className="init" />
            ) : (
              <>
                {passID ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <AiOutlineCloseCircle className="warn" />
                )}
              </>
            )}
          </CheckBox>
          <input
            className="idInput"
            type="text"
            placeholder="아이디 (5~10글자)"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <DupCheckBox onClick={checkDupID}>중복확인</DupCheckBox>
        </Input>
        {passID ? (
          <Passed>{checkIDText}</Passed>
        ) : (
          <Warning>{checkIDText}</Warning>
        )}

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
            placeholder="비밀번호 (8자리 이상) "
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </Input>

        <Warning>{checkPWText}</Warning>
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
      </LoginDataInput>
      <div className="locationCircle">
        <div className="circle Left"></div>
        <div className="circle Right"></div>
      </div>
      <button onClick={nextToUserData}>다음 페이지</button>
    </LoginDataBox>
  );
};

export default LoginData;

const LoginDataBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  & input {
    height: 50px;

    margin: 5px;
    border: none;
    background-image: url("/images/User");
    background-repeat: no-repeat;
    background-size: 32px;
    background-position: 10px center;
  }
  & .nickInput,
  .idInput {
    width: 290px;
  }

  & .pwInput {
    border-radius: 0 10px 10px 0;
    width: 340px;
  }

  & input::placeholder {
    color: #bdbdbd;
    font-size: 14px;
  }

  & input:focus {
    outline: none;
  }

  & button {
    color: white;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: none;
    height: 50px;
    width: 390px;
    margin: 8px;
    background-color: #2e2288;
    border: none;
    cursor: pointer;
  }

  & .locationCircle {
    display: flex;
    flex-direction: row;
    & .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 10px 10px 10px;
    }
    & .Left {
      background-color: #2e2288;
    }
    & .Right {
      background-color: #bdbdbd;
    }
  }
`;

const Title = styled.div`
  font-size: 13px;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LoginDataInput = styled.div`
  height: 600px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const DupCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: -5px;
  height: 52px;
  width: 50px;
  font-size: 10px;
  color: white;
  background-color: #2e2288;
  cursor: pointer;
`;
