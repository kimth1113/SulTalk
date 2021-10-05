const GET_USER = "user/SET_USER";
const UPDATE_USER = "user/UPDATE_USER";
const DELETE_USER = "user/DELETE_USER";

export const getUser = (user) => ({ type: GET_USER, user });
export const updateUser = (user) => ({ type: UPDATE_USER, user });
export const deleteUser = () => ({ type: DELETE_USER });

const initailState = {
  id: "",
  nickname: "",
  email: "",
  profileImg: "",
  address: "",
  sex: "",
  age: "",
  likes: "",
  token: "",
};

export default function user(state = initailState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        id: action.user.id,
        nickname: action.user.nickname,
        email: action.user.email,
        profileImg: action.user.profile,
        address: action.user.address,
        sex: action.user.sex,
        age: action.user.age,
        likes: action.user.likes,
        token: action.user.token,
      };
    case UPDATE_USER:
      return {
        ...state,
        id: action.user.id,
        nickname: action.user.nickname,
        email: action.user.email,
        profileImg: action.user.profile,
        address: action.user.address,
        sex: action.user.sex,
        age: action.user.age,
        likes: action.user.likes,
        token: action.user.token,
      };
    case DELETE_USER:
      return {
        ...state,
        id: "",
        nickname: "",
        email: "",
        profileImg: "",
        address: "",
        sex: "",
        age: "",
        likes: "",
        token: "",
      };
    default:
      return state;
  }
}
