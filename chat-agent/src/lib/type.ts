import type {  UIMessage } from "ai";
import { z } from "zod";


export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;



export type ChatMessage = UIMessage<
  MessageMetadata

>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};