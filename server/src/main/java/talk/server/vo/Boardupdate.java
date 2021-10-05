package talk.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boardupdate {
    private int board_no;// 게시글 번호
    private String board_type;// 건의, 불만 등 적는거
    private String board_title;// 제목
    private String board_content;// 내용
}
