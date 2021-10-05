package talk.server.controller;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import talk.server.jwt.JwtTokenProvider;
import talk.server.service.JwtUserDetailsService;
import talk.server.service.UserService;
import talk.server.vo.FailureLogin;
import talk.server.vo.ResUserInfo;
import talk.server.vo.User;
import talk.server.vo.Userupdate;


import java.io.File;
import java.io.IOException;
import java.util.*;

@Api(tags = {"회원관련 컨트롤러"})
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam String id,
                       @RequestParam String password,
                       @RequestParam String nickname,
                       @RequestParam(required = false) String email,
                       @RequestParam String sex,
                       @RequestParam String address,
                       @RequestParam String age,
                       @RequestParam(required = false) String likes,
                       @RequestParam(required = false) MultipartFile profileImg) throws IOException {
        Optional<User> userOptional = userService.getUserById(id);
        // 중복된 id 라면
        if (userOptional.isPresent()) {
            return new ResponseEntity<>("username", HttpStatus.OK);
        }

        userOptional = userService.getUserByNickName(nickname);
        // 중복된 nickname 이라면
        if (userOptional.isPresent()) {
            return new ResponseEntity<>("nickname", HttpStatus.OK);
        }


        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("password", password);
        map.put("nickname", nickname);
        if (email != null) map.put("email", email);
        else map.put("email", "");
        map.put("address", address);
        map.put("sex", sex);
        if (profileImg != null) map.put("profileImg", profileImg.getBytes());
        else map.put("profileImg", "");
        map.put("likes", 0);
        map.put("age", age);

        userService.setUser(map);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> map) {

        Optional<User> userOptional = userService.getUserById(map.get("id"));
        // id가 없다면
        if (!userOptional.isPresent()) {
            FailureLogin failureLogin = new FailureLogin();
            failureLogin.setResult("noid");
            failureLogin.setSuccess(false);

            return new ResponseEntity<>(failureLogin, HttpStatus.OK);
        }
        // pw가 틀리다면
        userOptional = userService.getUser(map);
        if (!userOptional.isPresent()) {
            FailureLogin failureLogin = new FailureLogin();
            failureLogin.setResult("nopassword");
            failureLogin.setSuccess(false);

            return new ResponseEntity<>(failureLogin, HttpStatus.OK);
        }

        final String token = jwtTokenProvider.createToken(userOptional.get().getId());

        ResUserInfo resUserInfo = new ResUserInfo();
        resUserInfo.setId(userOptional.get().getId());
        resUserInfo.setNickname(userOptional.get().getNickname());
        resUserInfo.setEmail(userOptional.get().getEmail());
//        resUserInfo.setProfileImg(userOptional.get().getProfileImg().getBytes());
        //Json으로 byte로 보내서 저장시킨다. 그때 쓰는것이 getBytes()
        resUserInfo.setProfileImg(userOptional.get().getProfileImg());
        resUserInfo.setAddress(userOptional.get().getAddress());
        resUserInfo.setSex(userOptional.get().getSex());
        resUserInfo.setAge(userOptional.get().getAge());
        resUserInfo.setLikes(userOptional.get().getLikes());
        resUserInfo.setToken(token);

        return new ResponseEntity<>(resUserInfo, HttpStatus.OK);
    }

    //회원 정보 수정
    @PostMapping("/userupdate")
    public ResponseEntity<Userupdate> userupdate(@RequestBody Userupdate userupdate ){
        userService.userupdate(userupdate);
        return new ResponseEntity<>(userupdate, HttpStatus.OK);
    }

    //친구 찾기용 회원 정보 전송
    @GetMapping("/findfriends")
    public ResponseEntity<ArrayList<User>> getAllUser() {
        ArrayList<User> list = userService.getAllUser();
        if (list != null) return new ResponseEntity<>(list, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
