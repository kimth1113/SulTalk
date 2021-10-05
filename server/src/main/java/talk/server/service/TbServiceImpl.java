package talk.server.service;

import talk.server.dao.TbDao;
import talk.server.vo.Tb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TbServiceImpl implements TbService{

    @Autowired
    TbDao dao;

    @Override
    public ArrayList<Tb> getAllTb() {
        return dao.getAllTb();
    }
}
