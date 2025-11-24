import type { ChatMessage } from '@/lib/type'
import Image from 'next/image'
import TextMarkdown from './text-markdown';

const ShowMessage = ({ message }: { message: ChatMessage }) => {
    const isUser = message.role === 'user';
    
    return (
        <div className={`flex w-full items-end gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <Image 
                width={32} 
                height={32} 
                className="w-8 h-8 rounded-full shrink-0 shadow-sm" 
                src={isUser ? "/icons/github.svg" : "/icons/google.svg"} 
                alt={isUser ? "User image" : "AI image"}
            />
            
            <div className={`flex flex-col gap-1   ${isUser ? 'items-end' : 'items-start'}`}>
                <span className="text-xs font-medium px-3 py-0.5">
                    {isUser ? 'You' : 'AI'}
                </span>
                
                <div className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                    isUser 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}>
                    {
                        message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return <TextMarkdown key={`${message.id}-${i}`} text={part.text} />
                                default:
                                    return null;
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowMessage

