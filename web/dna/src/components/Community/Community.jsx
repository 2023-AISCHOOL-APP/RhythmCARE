import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BoardList from "./BoardList";

const Community = () => {
  const [headerWidth, setHeaderWidth] = useState(window.innerWidth);
  // 화면 크기 줄어들 시 사이드바로 전환
  const handelResize = () => {
    setHeaderWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);

  const itemsPerPage = 10;
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [currentPage, setCurrentPage] = useState(1); // 페이지 이동
  const [initialLoad, setInitialLoad] = useState(true); // 초기 로딩 여부
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios.post("/board/getBoard").then((res) => {
      if (res.data.boardData) {
        res.data.boardData.map((board) => {
          board.created_at = board.created_at.split("T")[0];
          setBoardList((prev) => [...prev, board]);
        });
      }
    });
  }, []);

  const searchBoard = (e) => {
    e.preventDefault();
    const results = searchKeyword
      ? boardList.filter((data) => data.bd_title.includes(searchKeyword))
      : boardList;
    // 검색 결과 설정
    setSearchResults(results);
    // 검색 결과가 있을 경우 현재 페이지를 1로 설정
    setCurrentPage(results.length > 0 ? 1 : 0);
    setInitialLoad(false);
  };

  // 현재 페이지에 대한 인덱스 범위 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 현재 페이지의 아이템 가져오기
  const currentItems = searchKeyword
    ? searchResults
    : boardList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    (searchKeyword ? searchResults.length : boardList.length) / itemsPerPage
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // 검색어와 지역 데이터 비교

  const [search, setSearch] = useState(true);

  const searchData = () => {
    boardList.map((data) => {
      const title = [data.bd_title];
      const filterBoard = (query) => {
        return title.filter(
          (el) =>
            el
              .toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        );
      };
      if (filterBoard(searchKeyword).length != 0) {
        setSearchResults([...searchResults, data]);
      }
    });

    if (searchResults.length != 0) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  return (
    <CommunityBox>
      <ToolContainer>
        <form onSubmit={searchBoard}>
          <img src={`${process.env.PUBLIC_URL}/images/community/search.png`} />
          <input
            className="search_text"
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <input className="search_btn" type="submit" value="검색" />
        </form>
        <Link to="/boardwriteform">
          <button className="writeBtn">글쓰기</button>
        </Link>
      </ToolContainer>

      {headerWidth < 1040 ? (
        <></>
      ) : (
        <>
          <hr className="custom-hr" />
          <TableHeader>
            <div style={{ width: "10%" }}>글번호</div>
            <div style={{ width: "49%" }}>제목</div>
            <div style={{ width: "10%" }}>작성자</div>
            <div style={{ width: "10%" }}>작성일자</div>
            <div style={{ width: "10%" }}>좋아요수</div>
            <div style={{ width: "10%" }}>조회수</div>
          </TableHeader>
        </>
      )}

      <hr className="custom-hr" />

      {/* 검색 결과 있을때 */}
      {currentItems.length > 0 ? (
        currentItems.map((data, index) => (
          <BoardList
            data={data}
            index={index}
            length={boardList.length}
            key={data.bd_idx}
          />
        ))
      ) : // 결과 없을떄
      !initialLoad ? (
        <div style={{ textAlign: "center", padding: "10px 0 10px 0" }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        // 초기 로딩시 전체 데이터 표시
        boardList.map((data, index) => (
          <BoardList
            data={data}
            index={index}
            length={boardList.length}
            key={data.bd_idx}
          />
        ))
      )}
      <hr />
      {/* 페이지 버튼 이동 */}
      <Pagination>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </Pagination>
    </CommunityBox>
  );
};

export default Community;

const CommunityBox = styled.div`
  margin: 20px 300px 0 300px;

  & .custom-hr {
    border: 1px solid #2e2288;
  }

  @media only screen and (max-width: 1040px) {
    margin: 20px 50px 0 50px;
    font-size: 13px;
  }
`;

const ToolContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & img {
    width: 20px;
    padding-right: 10px;
  }

  & .search_text {
    width: 200px;
    height: 25px;
    margin-right: 10px;
  }

  & .search_btn {
    padding: 8px 10px;
    border-radius: 5px;
    border: none;
    background-color: #2e2288;
    color: white;
    font-size: 12px;
    cursor: pointer;
    text-decoration: none;
  }

  & .writeBtn {
    padding: 15px 32.5px;
    border-radius: 10px;
    border: none;
    background-color: #2e2288;
    color: white;
    font-size: 15px;
    cursor: pointer;
    display: block;
    text-decoration: none;
  }
  @media only screen and (max-width: 1040px) {
    & .search_text {
      width: 150px;
      height: 25px;
      margin-right: 10px;
    }

    & .writeBtn {
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
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-weight: bold;
  padding: 10px 0 10px 0;
`;

const Pagination = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  & button {
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
  }

  & button.active {
    background-color: #2e2288;
    color: white;
  }
`;
