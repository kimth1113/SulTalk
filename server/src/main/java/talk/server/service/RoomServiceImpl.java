package talk.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import talk.server.dao.RoomDao;
import talk.server.vo.Room;

import java.util.ArrayList;

@Service
public class RoomServiceImpl implements RoomService{
    @Autowired
    RoomDao roomDao;

    @Override
    public void makeRoom(Room room) {
        roomDao.makeRoom(room);
    }

    @Override
    public ArrayList<Room> roomList() {
        return roomDao.roomList();
    }


}
