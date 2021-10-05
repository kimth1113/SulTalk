package talk.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    private int BOARD_NO;// 게시판 번호
    private String BOARD_TYPE;// 건의, 불만 등 적는거
    private String BOARD_TITLE;// 제목
    private String BOARD_CONTENT;// 내용
    private int BOARD_CNT; //조회수
    private String BOARD_USER; // 글 작성자
    private Date BOARD_YMD; // 년 월 일 시간 분 초
}
