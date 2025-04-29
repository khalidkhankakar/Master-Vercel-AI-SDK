import { APICallError, generateText } from 'ai';
import { mistralModel } from '../models';

try {
  const { text } = await generateText({
    model: mistralModel,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
    console.log(text);
} catch (error) {
  if(APICallError.isInstance(error)) {
    console.error('API call failed:', error.message);
  }
    else {
        console.error('An unexpected error occurred:', error);
    }

}