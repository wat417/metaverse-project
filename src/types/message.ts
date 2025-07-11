// src/types/message.ts

export type ReplyState = 'pending' | 'done';

export interface Message {
  id: string;
  text: string;
  sender: string;
  botId?: string;
  timestamp: number;
  replyState?: ReplyState;
}