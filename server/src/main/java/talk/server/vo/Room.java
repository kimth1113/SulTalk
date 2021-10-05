package talk.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    private int id; // 방 번호
    private String title; // 방제
    private String master; // 방장 아이디
    private int max; // 최대 인원 설정
    private boolean b_password; // 방의 비밀번호 유무
    private String password; // 유라면 비밀번호 설정
    private boolean b_room; // 공개방인지 아닌지(사람들이 방송을 볼 수 있는지 없는지)
}
