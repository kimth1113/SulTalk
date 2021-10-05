import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatInput from '../components/ChatInput';
import ChatView from '../components/ChatView';


let sockJS = new SockJS("http://localhost:8080/webSocket");
let stompClient: Stomp.Client = Stomp.over(sockJS);
stompClient.debug = (str) => {
    console.log(str);
};

type ChatAppProps = {
    roomId: string;
}

type msgType = {
    roomId: string,
    nickname: string,
    content: string
};

function ChatApp({ match }: RouteComponentProps<ChatAppProps>) {
    const { roomId } = match.params;
    const [msg, setMsg] = useState<msgType>({
        roomId: '',
        nickname: '',
        content: ''
    });
    const [msgs, setMsgs] = useState<msgType[]>([]);

    useEffect(() => {
        console.log(match);
        // jwt token은 임시로 발급받은거 직접 넣어줌
        let headers = {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjI3MDQ1OTA5LCJleHAiOjE2MjcwNDk1MDl9.JYZ-f0kyz0CMGnTFor5LaxepcRPkhBHo5SUFItRYogg'
        };

        stompClient.connect(headers, () => {
            stompClient.subscribe(`/topic/${roomId}`, (data) => {
                console.log("d: " + data);
                const revMsg = JSON.parse(data.body);
                console.log(revMsg);
                setMsgs(prev => [...prev, {
                    roomId: revMsg['roomId'],
                    nickname: revMsg['nickname'],
                    content: revMsg['content']
                }]);
                console.log("msgs: " + msgs);
            });
        })
    }, []);

    const onSetMsg = (revMsg: msgType) => {
        setMsg({
            roomId: revMsg['roomId'],
            nickname: revMsg['nickname'],
            content: revMsg['content']
        });
        console.log("msggg: " + msg);
    }

    const onInput = (tempMsg: string) => {
        setMsg({
            roomId,
            nickname: 'test',
            content: tempMsg
        });
        console.log("msg: " + JSON.stringify(msg));
        stompClient.send(`/hello`, {}, JSON.stringify(msg));
    }

    return (
        <>
            <ChatInput onInput={onInput} />
            <ChatView msgs={msgs} />
        </>
    );
}

export default ChatApp;