import React from "react";
import "./css/Setting.css"

function Setting() {
  return (
    <div>
      <div className="setting-header">
        <h1>개발자 정보</h1>
      </div>
      <div className="setting-body">
        <div className="person">Leader 김도연</div>
        <div className="person">FrontEnd 김은지</div>
        <div className="person">FrontEnd 김태현</div>
        <div className="person">BackEnd 신종은</div>
        <div className="person">BackEnd 황성안</div>
      </div>
    </div>
  )
}

export default Setting;