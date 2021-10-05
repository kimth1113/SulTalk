import axios from "axios";
import React, { useState } from "react";
import "./css/CreateArticle.css";

function ArticleUpdate({ location }) {
  const { state } = location;
  console.log(state);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [board, setBoard] = useState({
    board_type: "",
    board_title: "",
    board_content: "",
    board_no: 0,
  });

  const fetchGetArticle = async () => {
    const url = `http://localhost:8080/stalk/board/boarddetail?board_no=${state["BOARD_NO"]}`;

    await axios
      .get(url)
      .then((res) => {
        setBoard({
          ...board,
          board_no: res.data["board_NO"],
          board_title: res.data["board_TITLE"],
          board_content: res.data["board_CONTENT"],
          board_type: res.data["board_TYPE"],
        });
      })
      .catch((err) => {
        alert("게시글 오류 발생");
      });
  };

  useState(() => {
    fetchGetArticle();
  }, []);

  const fetchUpdateArticle = async (data) => {
    const url = "http://localhost:8080/board/boardupdate";

    await axios
      .post(url, data)
      .then((res) => {
        window.location.replace(`/articles/${data.board_no}`);
      })
      .catch((err) => {
        alert("게시글 작성에 실패하셨습니다.");
      });
  };

  // 타입 선택
  const onTypeClick = (e) => {
    if (document.querySelector(".type-chk")) {
      document.querySelector(".type-chk").className = "type-1";
    }
    e.target.className = "type-chk";
    board.board_type = e.target.value;
  };

  if (board["board_type"] === "자유") {
    if (document.querySelector(".type-1")) {
      document.querySelector(".type-1").className = "type-chk";
    }
  } else if (board["board_type"] === "건의") {
    if (document.querySelector(".type-2")) {
      document.querySelector(".type-2").className = "type-chk";
    }
  } else if (board["board_type"] === "불만") {
    if (document.querySelector(".type-3")) {
      document.querySelector(".type-3").clasName = "type-chk";
    }
  } else if (board["board_type"] === "신고") {
    if (document.querySelector(".type-4")) {
      document.querySelector(".type-4").className = "type-chk";
    }
  }

  // 게시글 제목
  const onChangeTitle = (e) => {
    board.board_title = e.target.value;
  };

  // 게시글 내용
  const onChangeContent = (e) => {
    board.board_content = e.target.value;
  };

  // 게시글 수정
  const onUpdateArticle = () => {
    console.log(board);
    fetchUpdateArticle(board);
  };

  const onCancelArticle = () => {
    window.location.replace(`/articles/${board["board_no"]}`);
  };

  return (
    <div className="create-box">
      <div className="type-box">
        <input
          type="button"
          className="type-1"
          value="자유"
          onClick={onTypeClick}
        />
        <input
          type="button"
          className="type-2"
          value="건의"
          onClick={onTypeClick}
        />
        <input
          type="button"
          className="type-3"
          value="불만"
          onClick={onTypeClick}
        />
        <input
          type="button"
          className="type-4"
          value="신고"
          onClick={onTypeClick}
        />
      </div>
      <div className="input-box">
        <div className="article-input-box">
          <input
            className="article-title-box"
            placeholder="제목을 입력하세요..."
            defaultValue={board["board_title"]}
            onChange={onChangeTitle}
          ></input>
          <textarea
            className="article-content-box"
            placeholder="내용을 입력하세요..."
            defaultValue={board["board_content"]}
            onChange={onChangeContent}
          ></textarea>
        </div>
        <div></div>
        <div className="input-option">
          <textarea className="option-top">
            [메모장] 이 곳에 적는 글은 남들이 볼 수도 저장되지도 않습니다.
          </textarea>
          <div className="option-bottom">
            <button className="cancel-button" onClick={onCancelArticle}>
              취소
            </button>
            <button className="ok-button" onClick={onUpdateArticle}>
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleUpdate;
