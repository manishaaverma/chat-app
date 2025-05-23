import {usePostAiCodeMutation} from '@/state/api';
import React, {useState} from 'react';
import MessageFormUI from './MessageFormUI';

const AiCode = ({props, activeChat}) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    const [triggerCode] = usePostAiCodeMutation();

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        const date = new Date()
            .toISOString()
            .replace('T', ' ')
            .replace('Z', '+00:00');
        const at = attachment
            ? [{blob: attachment, file: attachment.name}]
            : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
        };

        props.onSubmit(form);
        triggerCode(form);
        setMessage('');
        setAttachment('');
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <MessageFormUI
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleKeyDown={handleKeyDown}
        />
    );
};

export default AiCode;
