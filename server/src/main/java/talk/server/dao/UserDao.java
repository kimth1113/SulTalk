package talk.server.dao;

import talk.server.vo.User;
import talk.server.vo.Userupdate;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

public interface UserDao {
    public Optional<User> getUserByNickName(String nickname);
    public Optional<User> getUserById(String id);
    public Optional<User> getUser(Map<String, String> map);
    public int setUser(Map<String, Object> map);
    public Map<String, Object> getProfileImg(String id);

//    //로그아웃
//    public void logout(HttpSession session) {
//        System.out.println(" 로그아웃 처리 ");
//        session.invalidate();
//    }
    //회원 정보 수정
    public void userupdate(Userupdate userupdate);

    //친구 찾기 정보 불러오기
    public ArrayList<User> getAllUser();

}
