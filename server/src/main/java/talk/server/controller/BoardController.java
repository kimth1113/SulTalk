package talk.server.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;
import talk.server.dao.BoardDao;
import talk.server.jwt.JwtTokenProvider;
import talk.server.service.BoardService;
import talk.server.service.UserService;
import talk.server.vo.Board;
import talk.server.vo.Boardupdate;
import talk.server.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;


@Api(tags = {"게시판 컨트롤러"})
@RequestMapping("/board")
@RestController
public class BoardController {
    //  R
    @Autowired
    private BoardService service;

    @GetMapping(value = "/boardlist")
    public ResponseEntity<ArrayList<Board>> getAllBoard() {
        ArrayList<Board> list = service.getAllBoard();
        if (list != null) return new ResponseEntity<>(list, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //    C

    //게시물 작성
    @Autowired
    private BoardDao boardDao;

    @PostMapping(value = "/boardcreate")
    public ResponseEntity<Boolean> Boardcreate(@RequestBody Map<String, String> map) throws ParseException {
//        System.out.println(map);
        Board board = new Board();
        SimpleDateFormat dateParser = new SimpleDateFormat("MM/dd/yy HH:mm:ss");

        board.setBOARD_TYPE(map.get("BOARD_TYPE"));
        board.setBOARD_TITLE(map.get("BOARD_TITLE"));
        board.setBOARD_CONTENT(map.get("BOARD_CONTENT"));
        board.setBOARD_CNT(new Integer(map.get("BOARD_CNT")));
        board.setBOARD_USER(map.get("BOARD_USER"));
        board.setBOARD_YMD(dateParser.parse(map.get("BOARD_YMD")));
        service.createsuc(board);

        return new ResponseEntity<>(true, HttpStatus.OK);

    }
// 상세보기 포인트
    @GetMapping(value = "/boarddetail")
    public ResponseEntity<Board> boarddetail(@RequestParam int board_no) {
        Board board = service.boarddetail(board_no);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }


//    U
    @PostMapping(value = "/boardupdate")
    public ResponseEntity<Boardupdate> boardupdate(@RequestBody Boardupdate boardupdate) {
        service.boardupdate(boardupdate);
        return new ResponseEntity<>(boardupdate, HttpStatus.OK);

    }

//    D
    @GetMapping(value = "/boarddelete")
    public ResponseEntity<ResponseStatus> boarddelete(@RequestParam int board_no) {
        service.boarddelete(board_no);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}