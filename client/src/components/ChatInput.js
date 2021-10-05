import React, { useState } from "react";

// onInput 함수가 msg를 저장
// type ChatInputProps = {
//   onInput: (msg) => void,
// };

function ChatInput({ onInput }) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      className="chat-send"
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          onInput(value);
          setValue("");
        }
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ width: "17.5rem" }}
        className="chat-input-detail"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onInput(value);
          setValue("");
        }}
        className="chat-input-detail-button"
      >
        보내기
      </button>
    </div>
  );
}

export default ChatInput;
