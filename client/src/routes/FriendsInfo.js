import React from "react";
import "./css/SearchFriends.css"

function FriendsInfo({ allUsers }) {
  
  console.log(allUsers)

  // 친구 선택
  const onSelectFriend = () => {
    window.location.replace("/chat");
  }

  return (
    <div>
      {allUsers.map((user) => (
        <div className="friend" onClick={onSelectFriend}>
          <div className="friend-img">
            <img src={user[3]} className="sf-image"/>
          </div>
          <div className="friend-info">
            {user[0]}<br/>
            {user[1]}<br/>
            {user[2]}
          </div>     
        </div> 
        ))}
    </div>
  )
}

export default FriendsInfo;