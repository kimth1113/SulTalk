import React from "react";
import "./css/Article.css";

function Article() {
  return (
    <div className="article-container">
      <div className="article">
        <div className="bold-line"></div>
        <div className="article-header">
          <div className="article-no"><p>번호</p></div>
          <div className="article-title"><p>제목</p></div>
          <div className="article-t"><p>글쓴이</p></div>
          <div className="article-t"><p>조회수</p></div>
          <div className="article-t"><p>날짜</p></div>
        </div>        
        <div className="t-line"></div>

        <div className="article-contents">
          <div className="article-body">
            <div className="article-no"><p>1</p></div>
            <div className="article-title"><p>김태현은 황성안꼬.</p></div>
            <div className="article-t"><p>황성안</p></div>
            <div className="article-t"><p>198</p></div>
            <div className="article-t"><p>2021.07.28</p></div>
          </div>
          <div className="line"></div>
        </div>
        
        <div className="article-bottom">
          <div>
            <button>&lt;&lt;</button>
            <button>&gt;&gt;</button>
          </div>
          <div>
            <button>글쓰기</button>
          </div>          
        </div>
      </div>

    </div>
  )
}

export default Article;