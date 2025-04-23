import { z } from 'zod';
import { generateText, tool } from 'ai';
import {  mistralModel } from '../model';

const {toolResults} = await generateText({
  model: mistralModel,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  prompt: 'What is the weather in London?',
});

console.log({toolResults: toolResults[0].result});