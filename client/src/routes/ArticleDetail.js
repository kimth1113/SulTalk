import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/ArticleDetail.css";
import moment from "moment";

function ArticleDetail(props) {
  const { location } = props;
  const { state } = location;
  console.log(state);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(props.match.params["id"]);

  const [board, setBoard] = useState({
    BOARD_NO: 0,
    BOARD_TYPE: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    BOARD_CNT: 0,
    BOARD_USER: userInfo.nickname,
    BOARD_YMD: "",
  });

  useEffect(() => {
    const getArticle = async () => {
      const response = await axios.get(
        `http://localhost:8080/board/boarddetail?board_no=${props.match.params["id"]}`
      );
      setBoard({
        ...board,
        BOARD_NO: response.data["board_NO"],
        BOARD_TYPE: response.data["board_TYPE"],
        BOARD_TITLE: response.data["board_TITLE"],
        BOARD_CONTENT: response.data["board_CONTENT"],
        BOARD_CNT: response.data["board_CNT"],
        BOARD_USER: response.data["board_USER"],
        BOARD_YMD: response.data["board_YMD"],
      });
    };
    getArticle();
  }, []);

  if (userInfo.nickname !== board.BOARD_USER) {
    document.querySelector(".article-ud").className = "article-ud-no";
  }

  const fetchDeleteArticle = async (no) => {
    const url = `http://localhost:8080/board/boarddelete?board_no=${no}`;
    await axios.get(url);
  };

  const onDeleteArticle = (no) => {
    fetchDeleteArticle(no);
    window.location.replace("/articles");
  };

  return (
    <div className="create-box">
      {console.log(board)}
      <div className="type-box">
        <input className="type" value={board.BOARD_TYPE} />
      </div>
      <div className="input-box">
        <div className="article-input-box">
          <div className="article-title-box">{board.BOARD_TITLE}</div>
          <div className="article-content-box">{board.BOARD_CONTENT}</div>
        </div>
        <div></div>
        <div className="input-option">
          <div className="option-bottom">
            <div className="option-button">작성 {board.BOARD_USER}</div>
          </div>
          <div className="option-bottom">
            <div className="option-button">
              날짜 {moment(board.BOARD_YMD).format("YYYY/MM/DD hh:mm")}
            </div>
          </div>
          {/* <div className="option-bottom">
            <div className="option-button">조회 {board.BOARD_CNT}회</div>
          </div> */}
          <div className="option-bottom article-ud">
            <Link
              to={{
                pathname: `/articles/${board.BOARD_NO}/update`,
                state: board,
              }}
            >
              <button className="back-button">수정</button>
            </Link>
          </div>
          <div className="option-bottom article-ud">
            <button
              className="back-button"
              onClick={() => onDeleteArticle(board.BOARD_NO)}
            >
              삭제
            </button>
          </div>
          <div className="option-bottom">
            <Link to="/articles" style={{ color: "black" }}>
              <button className="back-button list-btn">목록</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
