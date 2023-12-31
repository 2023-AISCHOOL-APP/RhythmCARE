import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import styled from "styled-components";

const BoardWriteForm = () => {
  const nav = useNavigate();
  const id = JSON.parse(localStorage.getItem("loginData")).id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [file, setFile] = useState("");

  const uploadBoard = (e) => {
    e.preventDefault();
    axios
      .post("/board/uploadBoard", { title: title, content: content, id: id })
      .then((res) => {
        if (res.data.uploadBoardResult) {
          alert("작성이 완료되었습니다.");
          nav("/community");
        } else {
          alert("[Network ERROR] 작성에 실패 하였습니다.");
        }
      });
  };

  return (
    <BoardWriteBox>
      <Link to="/community">
        <button>목록으로</button>
      </Link>
      <form onSubmit={uploadBoard}>
        <hr className="custom-hr" />
        <input
          id="boardtitle"
          type="text"
          placeholder="제목을 입력해주세요"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <hr />
        <textarea
          placeholder="내용을 입력해주세요"
          name=""
          id=""
          cols="140"
          rows="20"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <hr />

        <input id="putBtn" type="submit" value="등록하기" />
      </form>
    </BoardWriteBox>
  );
};

export default BoardWriteForm;

const BoardWriteBox = styled.div`
  margin: 20px 300px 0 300px;

  & .custom-hr {
    border: 1px solid #2e2288;
  }

  & Button {
    margin: 0 0 20px auto;
    padding: 15px 25px;
    border-radius: 10px;
    border: none;
    background-color: #2e2288;
    color: white;
    font-size: 15px;
    cursor: pointer;
    display: block;
  }

  & #boardtitle {
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    font-size: 20px;
    width: 100%;
  }

  & textarea {
    border: none;
    font-size: 20px;
    font-family: sans-serif;
    resize: none;
    width: 100%;
  }

  & #putBtn {
    margin: 20px auto 0 auto;
    padding: 15px 25px;
    border-radius: 10px;
    border: none;
    background-color: #2e2288;
    color: white;
    font-size: 15px;
    cursor: pointer;
    display: block;
  }

  @media only screen and (max-width: 1040px) {
    margin: 20px 50px 0 50px;

    & Button,
    #putBtn {
      padding: 8px 10px;
      border-radius: 5px;
      border: none;
      background-color: #2e2288;
      color: white;
      font-size: 15px;
      cursor: pointer;
      display: block;
      text-decoration: none;
    }

    & textarea,
    #boardtitle {
      font-size: 18px;
    }
  }
`;
