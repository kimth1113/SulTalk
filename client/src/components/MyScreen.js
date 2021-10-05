import React from "react";
import "../video.js"
import startAction from "../video.js"
import "./css/Screen.css";

function MyScreen() {

  return (
    <div className="screen-self">
      <div className="my-video">
        <video id="localVideo" autoPlay playsInline></video>
      </div>
      <div className="my-screen-bottom">
        <div className="msb-blank"></div>
        <div>
          <button 
            id="startButton"
            onClick={startAction}
          >
            내 화면 시작
          </button>
        </div>
        <div className="my-name">나</div>   
      </div>      
    </div>
  )
}

export default MyScreen