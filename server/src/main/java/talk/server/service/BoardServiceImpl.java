package talk.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import talk.server.dao.BoardDao;
import talk.server.vo.Board;
import talk.server.vo.Boardupdate;

import java.util.ArrayList;

@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    BoardDao dao;

    @Override
    public ArrayList<Board> getAllBoard() {
        return dao.getAllBoard();
    }

    @Override
    public int createsuc(Board board) {
        return dao.createsuc(board);
    }

    @Override
    public Board boarddetail(int board_no){
        return dao.boarddetail(board_no);
    }
    @Override
    public int boardupdate(Boardupdate boardupdate) {
        return dao.boardupdate(boardupdate);
    }

    @Override
    public void boarddelete(int board_no){
        dao.boarddelete(board_no);
    }
}
