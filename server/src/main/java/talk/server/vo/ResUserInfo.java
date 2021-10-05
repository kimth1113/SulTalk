package talk.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUserInfo {
    private String id;
    private String nickname;
    private String email;
    private String address;
    private String sex;
    private int age;
    private int likes;
    private String token;
//    private byte[] profileImg;
    private String profileImg;
}

