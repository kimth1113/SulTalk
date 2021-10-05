import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Chat.css";
import ChatApp from "./ChatApp";
import MyScreen from "./MyScreen";
import OppScreen from "./OppScreen";
import { useDispatch } from "react-redux";
import { deleteMessages } from "../modules/chatting";

function Chat() {
  const dispatch = useDispatch();
  const onDeleteMessages = () => dispatch(deleteMessages());

  const age_all = [
    "좋아하는 음식", "민트초코 & 파인애플 피자", "배라 좋아하는 맛 TOP3", "좋아하는 연예인",
    "좋아하는 영화 / 장르", "여름 vs 겨울", "국내여행 vs 해외여행", "가장 맛있었던 여행지 음식",
    "놀이공원, 놀이기구 호불호", "좋아하는 게임", "가장 최근에 본 영화", "가장 최근에 본 드라마",
    "전공", "해본 적 있는 아르바이트", "혈액형", "MBTI 결과","아침형 인간 vs 저녁형 인간",
    "운세, 사주 등을 믿는지", "귀신 본 경험", "요즘 가장 하고 싶은 것", "좋아하는 향 or 향수"
  ]
  const age_19 = [
    "3분컷 어떻게 생각하시나요?", "예상 할 수 없는 곳(야외 등) vs 집", "이상형의 섹스어필이 되는 곳", 
    "상대방이 혼전순결 vs 상대방이 경험치만렙", "친구의 전 애인이랑 하기 vs 전 애인의 친구랑 하기", "이성을 볼 때, 얼굴 VS 몸매",
    "가지 10초 vs 빼빼로 1시간", "낮져밤이 vs 낮이밤져", "이상형 팬티 속 내 손 vs 내 팬티 속 이상형 손",
    "혼자하다 걸리기 vs 애인이랑 하다 걸리기"
  ]
  const age_29 = [
    "3cm에 대해 어떻게 생각하시나요?", "강직도 vs 크기 vs 굵기", "빠르게 vs 천천히 vs 랜덤", "아침파 vs 저녁파 vs 언제든", 
    "묶인 상태로있기 vs 상대방을 묶기", "왁싱이돼있는 것 vs 안돼있는 것"
  ]


  const [randomContent, setRandomContent] = useState([]);

  const onRandomAll = () => {
    age_all.sort(() => Math.random() - 0.5)
    setRandomContent((randomContent) => [
      randomContent = age_all[0]
    ])
    if (document.querySelector(".chat-modal-no")) {
      document.querySelector(".chat-modal-no").className = "chat-modal"
    }
  }

  const onRandom19 = () => {
    age_19.sort(() => Math.random() - 0.5)
    setRandomContent((randomContent) => [
      randomContent = age_19[0]
    ])
    if (document.querySelector(".chat-modal-no")) {
      document.querySelector(".chat-modal-no").className = "chat-modal"
    }
  }

  const onRandom29 = () => {
    age_29.sort(() => Math.random() - 0.5)
    setRandomContent((randomContent) => [
      randomContent = age_29[0]
    ])
    if (document.querySelector(".chat-modal-no")) {
      document.querySelector(".chat-modal-no").className = "chat-modal"
    }
  }

  const onModalClose = () => {
    if (document.querySelector(".chat-modal")) {
      document.querySelector(".chat-modal").className = "chat-modal-no"
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-body">
        <div className="chat-1">
          <div className="opponent-screen">
            <OppScreen />
          </div>
          <div className="chat-btns">
            <div>
              <button className="chat-btn" onClick={onRandomAll}>전체연령가</button>
            </div>
            <div>
              <button className="chat-btn" onClick={onRandom19}>19금</button>
            </div>
            <div>
              <button className="chat-btn" onClick={onRandom29}>29금</button>
            </div>
          </div>
        </div>
        <div className="chat-2">
          <a href="/" onClick={onDeleteMessages}>
            <button className="chat-exit-btn">나가기</button>
          </a>
          <div className="my-screen">
            <MyScreen />
          </div>
          <div className="chat-screen">
            <ChatApp />
          </div>
        </div>
      </div>
      <div className="chat-modal-no">
        <div className="chat-modal-close">
          <button onClick={onModalClose}><h1>❌</h1></button>
        </div>
        <div className="chat-modal-body">
          <h1>{randomContent}</h1>
        </div>
      </div>
    </div>
  );
}

export default Chat;
