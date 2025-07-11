// src/stores/chatStore.ts

import { defineStore } from 'pinia';
import type { Message, ReplyState } from '@/types/message';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    selectedBotId: 'bot_001',
    replyStateMap: {} as Record<string, ReplyState>,
  }),

  actions: {
    addMessage(message: Message) {
      this.messages.push(message);
    },

    setReplyState(botId: string, state: ReplyState) {
      this.replyStateMap[botId] = state;
    },

    getMessagesByBot(botId: string) {
      return this.messages.filter(msg => msg.botId === botId);
    },
  },
});