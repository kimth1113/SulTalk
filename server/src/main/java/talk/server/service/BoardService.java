package talk.server.service;

import talk.server.vo.Board;
import talk.server.vo.Boardupdate;

import java.util.ArrayList;

public interface BoardService {
    //게시물 전체 리스트
    public ArrayList<Board> getAllBoard();

    //게시물 작성
    public int createsuc(Board board);

    //게시물 상세보기
    public Board boarddetail(int board_no);

    //게시물 업데이트
    public int boardupdate(Boardupdate boardupdate);

    //게시물 삭제
    public void boarddelete(int board_no);
}
