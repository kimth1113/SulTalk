import React from 'react';

type msgType = {
    roomId: string,
    nickname: string,
    content: string
};

type ChatViewProps = {
    msgs: msgType[]
};


function ChatView({ msgs }: ChatViewProps) {
    let key = 0;

    return (
        <>
            {msgs.map((msg) => (
                <div key={key++}>{msg.nickname} : {msg.content} </div>
            ))}
        </>
    );
}

export default ChatView;