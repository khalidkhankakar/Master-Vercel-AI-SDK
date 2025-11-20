'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from "react";
import ChatInput from "../_components/chat-input"

const RouteHandlerPage = () => {

  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="h-full">

      <div className="h-full flex  items-center  flex-col ">

        <div className=" p-12 font-sans w-[90%] md:w-2/3 h-4/5  overflow-y-auto space-y-2  ">
          {messages.map(message => (
            <div key={message.id} className="whitespace-pre-wrap border-2 ">
              {message.role === 'user' ? 'User: ' : 'AI: '}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i} ${message.role=== 'user' ?'bg-green-200':'bg-red:400' }`}>{part.text}</div>;
                }
              })}
            </div>
          ))}
        </div>

        <div className=" flex justify-center p-4 h-1/5 w-[90%] md:w-2/3 ">
          <ChatInput input={input} onInputChange={setInput} sendMessage={sendMessage} />
        </div>

      </div>
    </div>
  )
}

export default RouteHandlerPage;
