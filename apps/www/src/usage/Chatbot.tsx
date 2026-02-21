import React from 'react';
import Chatbot from '../components/docs/Chatbot';

const ChatbotUsage = () => {
    return (
        <div className="w-full py-12 px-4 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-3xl min-h-[600px]">
            <Chatbot />
        </div>
    );
};

export default ChatbotUsage;
