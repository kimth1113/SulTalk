package talk.server.dao;

import talk.server.vo.Room;

import java.util.ArrayList;

public interface RoomDao {
    public void makeRoom(Room room);
    public ArrayList<Room> roomList();
}
