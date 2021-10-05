import axios from "axios";
import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import "./css/Mypage.css";

function MypageUpdate() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  var imgProfile =
    "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F990FCD335A1D68190E36F5";

  if (userInfo.profileImg) {
    imgProfile = userInfo.profileImg;
  }

  var gender = "여";
  if (userInfo.sex === "male") {
    gender = "남";
  }

  const fetchUserUpdate = async (data) => {
    const url = "http://localhost:8080/user/userupdate";

    await axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        // 로컬스토리지 변경
        const data = {
          id: res.data.id,
          nickname: res.data.nickname,
          email: res.data.email,
          address: res.data.address,
          sex: res.data.sex,
          age: res.data.age,
          likes: res.data.likes,
          profileImg: res.data.profileImg,
        };
        localStorage.setItem("userInfo", JSON.stringify(data));
        window.location.replace("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [user, setUser] = useState({
    address: userInfo.address,
    age: userInfo.age,
    profileImg: userInfo.profileImg,
  });

  const onMpUpdateEnd = () => {
    if (user.age < 19 || user.age > 87) {
      alert("죄송합니다. 불가능한 나이입니다.");
    } else {
      const data = {
        profileImg: user.profileImg,
        address: user.address,
        age: user.age,
        id: userInfo.id,
        nickname: userInfo.nickname,
        email: userInfo.email,
      };
      fetchUserUpdate(data);
    }
  };

  const changeAge = (e) => {
    user.age = e.target.value;
  };

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
    if (document.querySelector(".modal-img-bg")) {
      document.querySelector(".modal-img-bg").className = "modal-img-no";
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
    document.querySelector(".mp-up-add").value = user.address;
    modalClose();
  };

  const onMpUpdateCancle = () => {
    window.location.replace("/mypage");
  };

  // 이미지 변경 모달
  const imgModal = () => {
    if (document.querySelector(".modal-img-no")) {
      document.querySelector(".modal-img-no").className = "modal-img-bg";
    }
  };

  // 이미지
  var img_n = [];
  for (let i = 0; i < 14; i++) {
    img_n.push(`/img/profile/${i}.png`);
  }

  const onSelectImg = (e) => {
    document.querySelector(".image_p").src = e.target.src;
    user.profileImg = e.target.src;
    modalClose();
  };

  return (
    <div>
      <div className="mp-update-bg">
        <div className="mp-update-title">
          <h1>회원정보 수정✍</h1>
        </div>
      </div>
      <div className="my-update-info">
        <div className="mp-top">
          <div className="mp-tt"></div>
          <div className="mp-nickname">
            <h1>{userInfo.nickname}</h1>
            <h2>님 🍻</h2>
          </div>
          <div className="mp-tt">
            <button onClick={onMpUpdateEnd}>
              <h3>수정완료</h3>
            </button>
            <button onClick={onMpUpdateCancle}>
              <h3>수정취소</h3>
            </button>
          </div>
        </div>
        <div className="user_mid-up">
          <img src={imgProfile} alt="{유저네임}" className="image_p" />
          <div className="up-image">
            <button onClick={imgModal}>이미지 선택</button>
          </div>
        </div>
        <div className="my-up-bottom">
          <h3>지역: </h3>
          <input
            type="text"
            value={user.address}
            className="mp-up-add"
            readOnly
          />
          <button onClick={modalOpen}>지역 변경</button>
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
          <h3>| 성별: {gender} | 나이: </h3>
          <input
            type="number"
            defaultValue={user.age}
            min="19"
            max="87"
            className="mp-up-age"
            onChange={changeAge}
          />
          <h3>세</h3>
        </div>
      </div>
      <div className="modal-img-no">
        <div className="modal-img">
          <div className="modal-close">
            <button onClick={modalClose}>
              <h3>❌</h3>
            </button>
          </div>
          <div className="modal-title">
            <h2>이미지 변경</h2>
          </div>
          <div className="p-imgs">
            {img_n.map((n) => (
              <img src={n} className="image_pp" onClick={onSelectImg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageUpdate;
