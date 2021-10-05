import axios from "axios";
import React, { useState } from "react";
import "./css/SearchFriends.css";

function SearchFriends() {
  const myInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 이미지 없는 경우
  var imgProfile =
    "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F990FCD335A1D68190E36F5";

  // 전체 유저 정보
  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/user/findfriends");
    return response.data;
  };

  const findFriends = async () => {
    const users = await getUsers();
    for (let i = 0; i < users.length; i++) {
      if (
        users[i]["address"] === myInfo.address &&
        users[i]["nickname"] !== myInfo.nickname
      ) {
        if (!users[i]["profileImg"].length) {
          users[i]["profileImg"] = imgProfile;
        }
        setAllUsers((allUsers) => [
          ...allUsers,
          [
            users[i]["nickname"],
            users[i]["age"],
            users[i]["sex"],
            users[i]["profileImg"],
          ],
        ]);
      }
    }
  };

  // 친구 선택
  const onSelectFriend = () => {
    window.location.replace("/chat");
  };

  // 친구 찾기 클릭
  const onSearchFriend = () => {
    if (document.querySelector(".friends-no")) {
      findFriends();
      document.querySelector(".friends-no").className = "friends";
      setTimeout(() => {
        if (document.querySelector(".not-friend-v")) {
          document.querySelector(".not-friend-v").className = "not-friend-view";
        }
      }, 1000);
    }
  };

  return (
    <div className="search-friend">
      <button className="sf-btn" onClick={onSearchFriend}>
        <h2>
          <span className="fs-label">{myInfo.address}</span>에 있는 친구찾기 🔍
        </h2>
      </button>
      <div className="friends-no">
        <div className={allUsers.length ? "not-friend" : "not-friend-v"}>
          <h1>
            <span className="nf-label">{myInfo.address}</span> 에 친구가
            없어요😥
          </h1>
        </div>
        {allUsers.map((user) => (
          <div className="friend" onClick={onSelectFriend}>
            <div className="friend-img">
              <img src={user[3]} className="sf-image" />
            </div>
            <div className="friend-info">
              {user[0]}
              <br />
              {user[1]}
              <br />
              {user[2]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFriends;
