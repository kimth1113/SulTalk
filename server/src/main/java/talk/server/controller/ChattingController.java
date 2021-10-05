package talk.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import talk.server.vo.Message;

@RestController
@RequiredArgsConstructor
public class ChattingController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/hello")
    public void boradCast(Message message){
        System.out.println("testtest");
        template.convertAndSend("/topic/" + message.getRoomId(), message);
//        return message;
    }

//    @MessageMapping("/hello/2")
//    @SendTo("/topic/2")
//    public Message boradCast2(Message message){
//        System.out.println("2 >> " + message);
//        return message;
//    }
}
