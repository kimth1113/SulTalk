package talk.server.dao;

import talk.server.vo.Board;
import talk.server.vo.Boardupdate;

import java.util.ArrayList;

public interface BoardDao {
    // 게시글 정보 불러오기
    public ArrayList<Board> getAllBoard();

    // 게시글 CRUD
    //C
    public int createsuc(Board board);

    // 게시글 디테일 정보 불러오기
    public Board boarddetail(int board_no);

    // 게시글 업데이트
    public int boardupdate(Boardupdate boardupdate);

    //게시글 삭제
    public void boarddelete(int board_no);
}
