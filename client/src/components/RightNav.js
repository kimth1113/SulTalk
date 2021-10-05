import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import "./css/Navigation.css";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(248, 231, 223);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #000;
    }
  }
`;

const RightNav = ({ open }) => {
  const Logout = () => {
    localStorage.clear()
  }

  return (
    <Ul open={open} className="burger-ul">
      <NavLink to="/">
        <li>Home</li>
      </NavLink>
      <NavLink to="/mypage">
        <li>마이페이지</li>
      </NavLink>
      <NavLink to="/search-friends">
        <li>친구찾기</li>
      </NavLink>
      <NavLink to="/articles">
        <li>게시판</li>
      </NavLink>
      <NavLink to="/setting">
        <li>친구찾기</li>
      </NavLink>
      <NavLink to="/logout">
        <li onClick={Logout}>로그아웃</li>
      </NavLink>
    </Ul>
  )
}

export default RightNav