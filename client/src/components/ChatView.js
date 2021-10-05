import React from "react";
import "./css/Chat.css";

import jquery from "jquery";
import $ from "jquery";

import { useSelector } from "react-redux";

// 이건 필요없지 않나?
// const ChatViewProps = {
//   msgs,
// };

// 실시간 채팅창
function ChatView({ msgs }) {
  const messages = useSelector((state) => state.chatting);
  const currentUser = useSelector((state) => state.user);

  var chatView = [];
  messages.map((chat) => {
    var nickname = chat["nickname"];
    var content = chat["content"];
    chatView.push([nickname, content]);
  });

  let key = 0;

  $(document).ready(function () {
    if ($(".chat-bg").length) {
      var scroll_h = $(".chat-bg")[0].scrollHeight;
      $(".chat-bg").scrollTop(scroll_h);
    }
  });

  return (
    <div className="chat-bg">
      <div className="chatting">
        {chatView.map((msg) => (
          <div key={key++}>
            {msg[0] === currentUser.nickname ? 
              <div className="my-balloon">
                <div className="my-text">{msg[1]}</div>
                <div className="me">나</div>
              </div> :
              <div className="opp-balloon">
                <div className="opp">{msg[0][0]}</div>
                <div className="opp-text">{msg[1]}</div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatView;
