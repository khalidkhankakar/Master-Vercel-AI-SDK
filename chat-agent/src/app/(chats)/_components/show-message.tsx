import type { ChatMessage } from '@/lib/type'
import Image from 'next/image'
import TextMarkdown from './text-markdown';

const ShowMessage = ({ message }: { message: ChatMessage }) => {
    const isUser = message.role === 'user';
    
    return (
        <div className={`flex flex-col w-full gap-2 mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
            
            <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
            <div className='flex items-center gap-2'>
            <Image 
                width={32} 
                height={32} 
                className="w-5 h-5 rounded-full shrink-0 shadow-sm" 
                src={isUser ? "/icons/github.svg" : "/icons/google.svg"} 
                alt={isUser ? "User image" : "AI image"}
            />
            <span className="text-sm font-medium py-0.5">
                    {isUser ? 'You' : 'AI'}
            </span>
                </div>
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

