import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { UseChatHelpers } from '@ai-sdk/react';
import type { ChatMessage } from '@/lib/type';



interface ChatInputProps {
    input: string;
    onInputChange: (value: string) => void;
    sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
}


const ChatInput = ({ input, onInputChange, sendMessage }: ChatInputProps) => {
    
    return (
        <div className='bg-foreground font-sans h-fit p-4 gap-2.5 flex items-center justify-center  w-[90%]  shadow-2xl rounded-full'>
            <Input value={input} onChange={(e) => onInputChange(e.target.value)}  className='border-none shadow-none outline-none hover:border-none hover:outline-none  focus-visible:ring-0 text-white placeholder:text-white !text-[14px] ' placeholder='Ask anything...' />
            <Button onClick={()=>{
                sendMessage({text:input})
                onInputChange('')
            }} size={'icon-lg'} className=' rounded-full text-sm  p-2 bg-white shadow-xl' asChild>
                <ArrowUp />
            </Button>

        </div>
    )
}

export default ChatInput
