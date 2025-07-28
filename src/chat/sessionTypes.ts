export interface ChatSessionData {
  sessionId: string;
  userId: string;
  messages: { content: string; timestamp: string }[];
}