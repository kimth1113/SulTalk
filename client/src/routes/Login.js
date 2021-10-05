import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import { useDispatch } from "react-redux";
import { getUser } from "../modules/user";
// import Cookies from "js-cookie";

function Login({ history }) {
  // [리덕스] 디스패치 함수 활성화
  const dispatch = useDispatch();

  // [리덕스] 유저 정보를 리덕스 스테이트에 저장하는 함수 생성
  const onGetUser = (userInfo) => dispatch(getUser(userInfo));

  // 경고창 중복 없애기
  const loginAlertCheck = () => {
    if (document.querySelector(".login-password-alert-view")) {
      document.querySelector(".login-password-alert-view").className =
        "login-password-alert";
    }
    if (document.querySelector(".login-alert-view")) {
      document.querySelector(".login-alert-view").className = "login-alert";
    }
    if (document.querySelector(".login-id-alert-view")) {
      document.querySelector(".login-id-alert-view").className =
        "login-id-alert";
    }
  };

  // 유저가 입력한 아이디와 비밀번호를 서버로 보내주고 그 결과값을 받는 함수 (33번째 줄 참고)
  const signIn = async ({ username, password }) => {
    // username(아이디)과 password를 서버로 넘긴다.
    const { data } = await axios.post("http://localhost:8080/user/signin/", {
      id: username,
      password: password,
    });
    // console.log(data);
    // 받아오는 (return) 데이터에는 success(로그인 성공 여부)와 token 값이 들어있음. (32번째 줄로..)
    return data;
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const changeLogin = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const { username, password } = user;

  // 유저가 (아이디와 비밀번호를 입력하고) 로그인 버튼을 눌렀을 때, 아래 함수 실행!
  const submitLogin = async ({ username, password }) => {
    if (document.querySelector(".loading-no")) {
      document.querySelector(".loading-no").className = "loading";
    }

    const userInfo = await signIn({
      username,
      password,
    });

    const {
      result,
      address,
      age,
      email,
      id,
      likes,
      nickname,
      profileImg,
      sex,
      token,
    } = userInfo;

    setTimeout(() => {
      // 없는 아이디
      if (result === "noid") {
        loginAlertCheck();
        if (document.querySelector(".login-id-alert")) {
          document.querySelector(".login-id-alert").className =
            "login-id-alert-view alert";
        }
      }
      // 비밀번호 틀림
      else if (result === "nopassword") {
        loginAlertCheck();
        if (document.querySelector(".login-password-alert")) {
          document.querySelector(".login-password-alert").className =
            "login-password-alert-view alert";
        }
      }
      // 만약 로그인 성공 시
      else if (token) {
        // 토큰값을 받아 세션을 생성하고 쿠키에 저장한다. => session: <토큰값>
        // Cookies.set("session", token);
        localStorage.setItem("token", token);
        const userInfo = {
          id: id,
          nickname: nickname,
          email: email,
          address: address,
          sex: sex,
          age: age,
          likes: likes,
          profileImg: profileImg,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // [리덕스] 유저 정보 리덕스에 저장
        onGetUser(userInfo);

        user.username = "";
        user.password = "";

        // 마이페이지로 이동
        history.push("/mypage");
      }
      // 다른 로그인 실패 상황
      else {
        loginAlertCheck();
        if (document.querySelector(".login-alert")) {
          document.querySelector(".login-alert").className =
            "login-alert-view alert";
        }
      }

      if (document.querySelector(".loading")) {
        document.querySelector(".loading").className = "loading-no";
      }
    }, 3000);
  };

  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      submitLogin(user);
    }
  });

  const loading = "/img/loading.gif";

  return (
    <div className="login">
      <div className="login-id-alert">
        <h3>존재하지 않는 아이디입니다.</h3>
      </div>
      <div className="login-password-alert">
        <h3>비밀번호를 확인해 주세요.</h3>
      </div>
      <div className="login-alert">
        <h3>로그인에 실패하였습니다.</h3>
      </div>
      <div className="login-box">
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <b>아이디</b> :{" "}
          <input
            className="form-input"
            name="username"
            value={username}
            onChange={changeLogin}
            placeholder="아이디를 입력하세요."
          ></input>
        </div>
        <div>
          <b>비밀번호</b> :{" "}
          <input
            className="form-input"
            name="password"
            value={password}
            onChange={changeLogin}
            placeholder="비밀번호를 입력하세요."
            type="password"
          ></input>
        </div>
        <div>
          <button onClick={() => submitLogin(user)} className="login-btn">
            <h3>로그인</h3>
          </button>
        </div>
        <div className="login-bottom">
          <div className="social"></div>
          <div className="signup-link">
            <Link to="/signup">
              <p>신규 회원 가입</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="loading-no">
        <img src={loading} />
      </div>
    </div>
  );
}

export default Login;
