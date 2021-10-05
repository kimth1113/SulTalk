import React, { useEffect, useState } from "react";
import "./css/Articles.css";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Article({ article }) {
  return (
    <Link
      to={{
        pathname: `/articles/${article["board_NO"]}`,
        state: article,
      }}
    >
      <div className="title-box">{article["board_TITLE"]}</div>
      <div className="content-box">
        <div className="title-content">{article["board_CONTENT"]}</div>
      </div>
      <div className="footer-box">
        <div style={{ padding: "0.5rem 1rem " }}>{article["board_USER"]}</div>
        <div style={{ padding: "0.5rem 1rem" }}>{article["board_YMD"]}</div>
      </div>
    </Link>
  );
}

function MyArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get("http://localhost:8080/board/boardlist");
      setArticles(articles.concat(response.data));
    };
    getArticles();
  }, []);

  return (
    <div className="all-article-box">
      <div className="upper-box">
        <div className="order-list">
          <div className="order">최신순</div>
          <div className="order">조회순</div>
          <div className="order">댓글부자순</div>
          <div className="order">오래된순</div>
        </div>
        <div
          style={{
            backgroundColor: "#FFA3A3",
            borderRadius: "12px",
            height: "2rem",
            fontSize: "1.2rem",
            textAlign: "center",
            paddingTop: "4px",
            width: "62%",
            marginLeft: "2.2rem",
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
          }}
        >
          <Link to="/articles" className="my-button">
            전체 게시글 보러 가기
          </Link>
        </div>
      </div>
      <div className="article-body">
        {articles.map((article) => (
          <div className="article-box" key={article["board_NO"]}>
            <Article article={article} />
          </div>
        ))}
      </div>
      <Link to="/articles/create-article" className="create-article-button">
        +
      </Link>
    </div>
  );
}

export default MyArticles;
