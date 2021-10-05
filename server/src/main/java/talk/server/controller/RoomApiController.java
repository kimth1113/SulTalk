package talk.server.controller;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import talk.server.service.RoomService;
import talk.server.vo.Room;

import java.util.ArrayList;

@Api(tags = {"랜덤 매칭 컨트롤러(나중에 수정해햐함)"})
@RestController
@RequestMapping("/room")
public class RoomApiController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/makeroom")
    public ResponseEntity<Room> makeRoom(@RequestBody Room paramRoom) {
        // 일단 에러에 대한 처리는 없음
        System.out.println(paramRoom);
//        roomService.makeRoom(paramRoom);
        return new ResponseEntity<Room>(paramRoom, HttpStatus.OK);
    }

    @GetMapping("/roomlist")
    public ResponseEntity<ArrayList<Room>> roomList() {
        ArrayList<Room> roomList = roomService.roomList(); // 일단 나중에 필요할 수도 있어서 코드만 추가
        if (roomList.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 만들어진 방이 없을 때
        else return new ResponseEntity<ArrayList<Room>>(roomList, HttpStatus.OK);
    }
}
