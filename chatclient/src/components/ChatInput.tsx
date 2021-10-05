import React, { useState } from 'react';

type ChatInputProps = {
    onInput: (msg: string) => void;
}

function ChatInput({ onInput }: ChatInputProps) {
    const [value, setValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={(e) => {
                e.preventDefault();
                onInput(value);
                setValue('');
            }}>보내기</button>
        </>
    );
}

export default ChatInput;