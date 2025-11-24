'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from "react";
import ChatInput from "../_components/chat-input"
import ShowMessage from './show-message';

const RouteHandlerPage = () => {

  const [input, setInput] = useState('');
  const { messages, sendMessage, } = useChat();

  return (
    <div className="h-full">

      <div className="h-full flex  items-center  flex-col ">

        <div className=" p-2 font-sans w-[90%] md:w-2/3 h-4/5  overflow-y-auto space-y-2  ">
          {messages.map(message => (
            <ShowMessage key={message.id} message={message} />
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
