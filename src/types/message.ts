// types/message.ts

export interface Message {
  id: string;
  text: string;
  sender: string; // 'user' または 'bot_xxx'
  botId?: string; // Bot識別用ID
  timestamp: number;
  replyState?: 'pending' | 'done';
}