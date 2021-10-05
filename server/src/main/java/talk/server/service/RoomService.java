package talk.server.service;

import talk.server.vo.Room;

import java.util.ArrayList;

public interface RoomService {
    public void makeRoom(Room room);
    public ArrayList<Room> roomList();
}
