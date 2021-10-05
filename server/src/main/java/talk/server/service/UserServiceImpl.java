package talk.server.service;

import talk.server.dao.UserDao;
import talk.server.jwt.JwtTokenProvider;
import talk.server.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import talk.server.vo.Userupdate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao dao;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public Optional<User> getUserByNickName(String nickname) {
        return dao.getUserByNickName(nickname);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return dao.getUserById(id);
    }

    @Override
    public Optional<User> getUser(Map<String, String> map) {
        Optional<User> user = dao.getUser(map);
        return user;
    }

    @Override
    public boolean setUser(Map<String, Object> map) {
        int result = dao.setUser(map);
        if (result == 1) return true;
        else return false;
    }

    @Override
    public Map<String, Object> getProfileImg(String id) {
        return dao.getProfileImg(id);
    }

    @Override
    public void userupdate(Userupdate userupdate) {
        dao.userupdate(userupdate);
    }

//    @Override
//    public void logout(HttpSession session) {
//        dao.logout(session);
//    }

    @Override
    public ArrayList<User> getAllUser() { return dao.getAllUser(); }
}
