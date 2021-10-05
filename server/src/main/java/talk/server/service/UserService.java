package talk.server.service;

import talk.server.vo.User;
import talk.server.vo.Userupdate;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

public interface UserService {
    //로그인 확인
    public Optional<User> getUserByNickName(String nickname);
    public Optional<User> getUserById(String id);
    public Optional<User> getUser(Map<String, String> map);
    public boolean setUser(Map<String, Object> map);
    public Map<String, Object> getProfileImg(String id);

    //로그아웃
//    public void logout(HttpSession session);

    //회원 정보 수정
    public void userupdate(Userupdate userupdate);
    //친구 찾을려면 정보 불러와줘야함
    public ArrayList<User> getAllUser();
}
