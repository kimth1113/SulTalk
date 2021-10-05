import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatInput from "./ChatInput";
import ChatView from "./ChatView";
import "./css/Chat.css";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../modules/chatting";

// 새로운 웹소켓 하나 생성
let sockJS = new SockJS("http://localhost:8080/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug = (str) => {
  console.log(str);
};

// const ChatAppProps = {
//   roomId,
// };

function ChatApp({ match }) {
  // [리덕스] 디스패치 함수 활성화
  const dispatch = useDispatch();

  // [리덕스] 유저 정보를 리덕스 스테이트에 저장하는 함수 생성
  const onAddMessage = (msg) => dispatch(addMessage(msg));

  // const { roomId } = match.params;
  const roomId = 1;
  const [msgs, setMsgs] = useState([]);

  const user = useSelector((state) => state.user);
  console.log(user);

  const myToken = localStorage.getItem("token");

  useEffect(() => {
    console.log(match);
    // jwt token은 임시로 발급받은거 직접 넣어줌
    let headers = {
      // Authorization: `Bearer ${myToken}`,
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmcmVzaCIsImlhdCI6MTYyOTM3MjA1NSwiZXhwIjoxNjI5MzczODU1LCJpZCI6Im9wZWVyYXRzIn0.eCEZCR-8MdINTvcNnRHpKh648Isb0JVRIv4Asm_nfQY",
    };

    // 2. 채팅방 구독하기 (채팅방 입장)
    stompClient.connect(headers, () => {
      console.log("test");

      stompClient.subscribe(`/topic/${roomId}`, (data) => {
        const revMsg = JSON.parse(data.body);
        console.log(revMsg);
        setMsgs((prev) => [
          ...prev,
          {
            roomId: revMsg["roomId"],
            nickname: revMsg["nickname"],
            content: revMsg["content"],
          },
        ]);
        onAddMessage({
          roomId: revMsg["roomId"],
          nickname: revMsg["nickname"],
          content: revMsg["content"],
        });
      });
    });
  }, []);

  // 3. 메세지 송신하기 (send)
  const onInput = (msg) => {
    const chatData = {
      roomId: 1, // 변경 필요
      nickname: user.nickname,
      content: msg,
    };
    stompClient.send(`/hello`, {}, JSON.stringify(chatData));
  };
  return (
    <>
      <ChatView msgs={msgs} />
      <ChatInput onInput={onInput} />
    </>
  );
}

export default ChatApp;
