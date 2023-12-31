import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { VscEdit } from "react-icons/vsc";
import styled from "styled-components";
import Image from "./Image";
import ManagerData from "./ManagerData";
import UserData from "./UserData";
import Delete from "./Delete/Delete";
import Badge from "./Badge/Badge";
import ChangeNick from "./Change/ChangeNick";
const MyPage = () => {
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData == null) {
      window.location.replace("/");
    }
  }, []);

  // 닉네임 변경 모달 띄우기
  const [changeNickOpen, setChangeNickOpen] = useState(false);

  // 모달창 노출
  const showChangeNick = () => {
    setChangeNickOpen(true);
  };
  // 닉네임 변경 모달 끝

  return (
    <MyPageBox>
      <MypageContent>
        {/* 유저 사진 정보 표시 */}
        <Image />

        {/* 유저 닉네임 표시 */}
        <NickBox>
          <div style={{ fontWeight: "bold" }}>
            {userData == null ? "" : userData.mem_nick}
          </div>
          <VscEdit onClick={showChangeNick} />
        </NickBox>
        {changeNickOpen && <ChangeNick setChangeNickOpen={setChangeNickOpen} />}
        {/* 보호자 정보 */}
        <ManagerData />

        {/* 기기 사용자 정보 */}
        <TitleBox>
          <div className="mainTitle">기기 사용자 정보</div>
        </TitleBox>
        <UserData />

        {/* 뱃지 정보 */}
        <TitleBox>
          <div className="mainTitle">내 뱃지</div>
          <hr width="100%" />
        </TitleBox>
        <Badge />

        {/* 계정 탈퇴 */}
        <TitleBox>
          <div className="mainTitle">계정 탈퇴</div>
          <div className="subTitle">
            <div>탈퇴 후 복구할 수 없습니다.&nbsp;</div>
            <div>신중하게 결정해주세요.</div>
          </div>
        </TitleBox>
        <Delete />
      </MypageContent>
    </MyPageBox>
  );
};

export default MyPage;

const MyPageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-top: -9px;
  height: fit-content;
`;

const MypageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  height: fit-content;
  width: 1000px;
  margin: 40px 0 40px 0;
  @media screen and (max-width: 1040px) {
    width: 90%;
  }
`;

const NickBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 30px;
  font-size: 22px;
  & svg {
    cursor: pointer;
    margin: 5px 0 0 10px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 50px 0 20px 0;

  & .mainTitle {
    font-size: 22px;
    font-weight: bold;
  }

  & .subTitle {
    display: flex;
    font-size: 12px;
    @media only screen and (max-width: 380px) {
      flex-direction: column;
    }
  }
`;
