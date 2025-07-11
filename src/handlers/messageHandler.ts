// src/handlers/messageHandler.ts

import type { Message } from '@/types/message';
import { useChatStore } from '@/stores/chatStore';

export async function generateBotReply(botId: string, userMessage: string): Promise<Message> {
  const chatStore = useChatStore();
  chatStore.setReplyState(botId, 'pending');

  const replyText = `Bot ${botId} の応答です：「${userMessage}」に対して確認しました。`;

  const reply: Message = {
    id: `reply-${Date.now()}`,
    text: replyText,
    sender: `bot_${botId}`,
    botId,
    timestamp: Date.now(),
    replyState: 'done',
  };

  chatStore.addMessage(reply);
  chatStore.setReplyState(botId, 'done');

  return reply;
}