// chatStore.ts（修正後）

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Message } from '@/types/message';

export const useChatStore = defineStore('chat', () => {
  const messageHistory = ref<Message[]>([]);

  function addMessage(message: Message) {
    messageHistory.value.push(message);
  }

  function getBotMessages(botId: string) {
    return messageHistory.value.filter((msg) =>
      msg.sender?.startsWith('bot_') && msg.botId === botId
    );
  }

  const selectedBotId = ref<string>('bot_001');

  return { messageHistory, addMessage, getBotMessages, selectedBotId };
});