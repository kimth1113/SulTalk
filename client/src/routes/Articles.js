import React, { useEffect, useState } from "react";
import "./css/Articles.css";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

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
        <div style={{ padding: "0.5rem 1rem" }}>
          {moment(article["board_YMD"]).format("YYYY/MM/DD hh:mm")}
        </div>
      </div>
    </Link>
  );
}

function Articles() {
  const [articles, setArticles] = useState([]);
  const [all_articles, setAllArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get("http://localhost:8080/board/boardlist");
      setArticles(articles.concat(response.data));
      setAllArticles(all_articles.concat(response.data));
    };
    getArticles();
  }, []);

  const onTypeClick = (e) => {
    if (document.querySelector(".type-chk")) {
      document.querySelector(".type-chk").className = "type-1";
    }
    e.target.className = "type-chk";
    if (e.target.value === "전체") {
      setArticles((articles) => all_articles);
    } else {
      var a = [];
      for (let i = 0; i < all_articles.length; i++) {
        if (all_articles[i]["board_TYPE"] === e.target.value) {
          a.push(all_articles[i]);
        }
      }
      setArticles((articles) => a);
    }
  };

  return (
    <div className="all-article-box">
      <div className="upper-box">
        <div className="type-box">
          <input
            type="button"
            className="type-chk"
            value="전체"
            onClick={onTypeClick}
          />
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

export default Articles;
