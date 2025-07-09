export type Message = {
  text: string;
  sender: string;
  timestamp: string;
};

import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    sendMessage(text: string) {
      this.messages.push({
        text,
        sender: 'user',
        timestamp: new Date().toISOString(),
      });
    }
  }
});
