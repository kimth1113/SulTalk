import React, { useState } from "react";
import axios from "axios";
import "./css/Signup.css";
import DaumPostCode from "react-daum-postcode";
// import { Link } from "react-router-dom";

function Signup({ history }) {
  // 새로고침 막기
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.defaultPrevented) {
        return;
      } else if (e.keyCode === 116) {
        e.preventDefault();
      } else if (e.ctrlKey === true && (e.keyCode === 78 || e.keyCode === 82)) {
        e.preventDefault();
      }
    },
    true
  );

  // 경고창 중복 없애기 (계속 틀릴 경우 경고창이 쌓일 경우를 대비)
  const alertCheck = () => {
    if (document.querySelector(".password-alert-view")) {
      document.querySelector(".password-alert-view").className =
        "password-alert";
    }
    if (document.querySelector(".nickname-alert-view")) {
      document.querySelector(".nickname-alert-view").className =
        "nickname-alert";
    }
    if (document.querySelector(".info-alert-view")) {
      document.querySelector(".info-alert-view").className = "info-alert";
    }
    if (document.querySelector(".username-alert-view")) {
      document.querySelector(".username-alert-view").className =
        "username-alert";
    }
    if (document.querySelector(".length-alert-view")) {
      document.querySelector(".length-alert-view").className = "length-alert";
    }
    if (document.querySelector(".age-alert-view")) {
      document.querySelector(".age-alert-view").className = "age-alert";
    }
  };

  const fetchSignup = async (userInfo) => {
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "http://localhost:8080/user/signup/";
    const data = userInfo;

    await axios
      .post(url, data, config)
      .then((response) => {
        // 로그인 성공
        if (response.data === "success") {
          goLoginPage();
        }
        // 아이디 중복
        else if (response.data === "username") {
          alertCheck();
          if (document.querySelector(".username-alert")) {
            document.querySelector(".username-alert").className =
              "username-alert-view alert";
          }
        }
        // 닉네임 중복
        else if (response.data === "nickname") {
          alertCheck();
          if (document.querySelector(".nickname-alert")) {
            document.querySelector(".nickname-alert").className =
              "nickname-alert-view alert";
          }
        }
        // 실패
        else {
          alertCheck();
          if (document.querySelector(".info-alert")) {
            document.querySelector(".info-alert").className =
              "info-alert-view alert";
          }
        }
      })
      // 에러 발생 => 회원가입 실패
      .catch((error) => {
        alertCheck();
        if (document.querySelector(".info-alert")) {
          document.querySelector(".info-alert").className =
            "info-alert-view alert";
        }
      });
  };

  const [user, setUser] = useState({
    nickname: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    address: "",
    sex: "",
    age: "",
  });

  const changeSignup = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const changeSex = (e) => {
    user.sex = e.target.value;
  };

  const changeAge = (e) => {
    user.age = e.target.value;
  };

  const submitSignup = () => {
    if (
      user.nickname.length === 0 ||
      user.nickname.length === 0 ||
      user.password.length === 0 ||
      user.passwordConfirmation.length === 0 ||
      user.sex.length === 0
    ) {
      alertCheck();
      if (document.querySelector(".length-alert")) {
        document.querySelector(".length-alert").className =
          "length-alert-view alert";
      }
    } else if (user.password !== user.passwordConfirmation) {
      alertCheck();
      if (document.querySelector(".password-alert")) {
        document.querySelector(".password-alert").className =
          "password-alert-view alert";
      }
    } else if (user.age < 19 || user.age > 87) {
      alertCheck();
      if (document.querySelector(".age-alert")) {
        document.querySelector(".age-alert").className = "age-alert-view alert";
      }
    } else {
      const formData = new FormData();
      formData.append("id", user.username);
      formData.append("password", String(user.password));
      formData.append("nickname", user.nickname);
      formData.append("sex", user.sex);
      formData.append("address", user.address);
      formData.append("age", parseInt(user.age));
      fetchSignup(formData);
    }
  };

  const goLoginPage = () => {
    history.push("/login");
  };

  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      submitSignup();
    }
  });

  const { nickname, username, password, passwordConfirmation, address } = user;

  const iconArrow = "/img/icon_arrow.png";

  // 모달
  const modalOpen = () => {
    if (document.querySelector(".modal-addr-no")) {
      document.querySelector(".modal-addr-no").className = "modal";
    }
  };

  const modalClose = () => {
    if (document.querySelector(".modal")) {
      document.querySelector(".modal").className = "modal-addr-no";
    }
  };

  // 주소
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    var splitAddress = fullAddress.split(" ");
    user.address = splitAddress[0] + " " + splitAddress[1];
    document.querySelector(".address-info").value = user.address;
    modalClose();
  };

  return (
    <div className="signup-box">
      <div className="length-alert">
        <h3>⛔ 필수 정보(*)를 모두 입력해 주세요.</h3>
      </div>
      <div className="password-alert">
        <h3>⛔ 비밀번호를 확인해 주세요.</h3>
      </div>
      <div className="username-alert">
        <h3>⛔ 동일한 아이디가 존재합니다.</h3>
      </div>
      <div className="nickname-alert">
        <h3>⛔ 동일한 닉네임이 존재합니다.</h3>
      </div>
      <div className="info-alert">
        <h3>⛔ 회원가입에 실패하였습니다.</h3>
      </div>
      <div className="age-alert">
        <h3>⛔ 죄송합니다. 가입이 불가능한 나이입니다.</h3>
      </div>
      <div className="signup-form">
        <div>
          <div className="arrow">
            <img
              src={iconArrow}
              alt="화살표"
              className="icon-arrow"
              style={{ cursor: "pointer" }}
              onClick={goLoginPage}
            />
          </div>
          <div className="signup-label">
            <h1>회원가입</h1>
          </div>
        </div>
        <div className="signup-main">
          <div className="nickname">
            <b>닉네임 *</b>{" "}
            <input
              className="form-input"
              name="nickname"
              value={nickname}
              onChange={changeSignup}
              placeholder="닉네임을 입력하세요."
            ></input>
          </div>
          <div className="username">
            <b>아이디 *</b>{" "}
            <input
              className="form-input"
              name="username"
              value={username}
              onChange={changeSignup}
              placeholder="아이디를 입력하세요."
            ></input>
          </div>
          <div className="password">
            <b>비밀번호 *</b>{" "}
            <input
              className="form-input"
              name="password"
              value={password}
              onChange={changeSignup}
              placeholder="비밀번호를 입력하세요."
              type="password"
            ></input>
          </div>
          <div className="password-confirm">
            <b>비밀번호 확인 *</b>{" "}
            <input
              className="form-input"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={changeSignup}
              placeholder="비밀번호를 다시 입력하세요."
              type="password"
            ></input>
          </div>
          <div className="input-2">
            <div>
              <b>성별 *</b>
            </div>
            <form className="form-input-2">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={changeSex}
                ></input>
                <label for="male">남</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={changeSex}
                ></input>
                <label for="female">여</label>
              </div>
            </form>
          </div>
          <div className="input-2">
            <div>
              <b>나이</b>
            </div>
            <div className="form-input-2">
              <input type="number" min="19" max="87" onChange={changeAge} />세
            </div>
          </div>
          <div className="input-2">
            <div>
              <b>지역</b>
            </div>
            <div className="form-input-2">
              <input
                type="text"
                className="address-info"
                name="address"
                value={address}
                readOnly
                onChange={changeSignup}
              />
              <button onClick={modalOpen}>검색</button>
            </div>
            <div className="modal-addr-no">
              <div className="modal-body">
                <div className="modal-close">
                  <button onClick={modalClose}>
                    <h3>❌</h3>
                  </button>
                </div>
                <div className="modal-title">
                  <h3>📫 주소검색</h3>
                </div>
                <DaumPostCode onComplete={handleComplete} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <button onClick={submitSignup} className="signup-btn">
            <h3>회원가입</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
