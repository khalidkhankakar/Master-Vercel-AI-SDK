import { generateText, type CoreMessage } from "ai";
import { mistral } from "../models";

const messages : CoreMessage[] = [
{
    role:"system",
    content:"You are a helpful assistant for greeting."
},
{
    role:"user",
    content:"Hello!"
}
]

const messageHistory = async (messages: CoreMessage[]):Promise<CoreMessage[]> => {

    const {response: {messages:responseMessages}} = await generateText({
        model: mistral("Mistral-large-2411"),
        messages: messages,
    })

    const assistantMessage = responseMessages[0]; 
    const fullConversation: CoreMessage[] = [...messages, assistantMessage];
  
    return fullConversation;
  
}


const responseMessages = await messageHistory(messages);
console.log("Full Conversation:", responseMessages);