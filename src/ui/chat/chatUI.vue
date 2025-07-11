<template>
  <div class="chat-ui">
    <div
      v-for="msg in filteredMessages"
      :key="msg.id"
      :class="bubbleClass(msg)"
    >
      <div class="message-text">{{ msg.text }}</div>
      <div class="timestamp">{{ formatTime(msg.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import type { Message } from '@/types/message';

const chatStore = useChatStore();

const filteredMessages = computed(() =>
  chatStore.getMessagesByBot(chatStore.selectedBotId)
);

const bubbleClass = (msg: Message) => {
  if (msg.sender === 'user') return 'bubble user';
  if (msg.sender.startsWith('bot_')) return 'bubble bot';
  return 'bubble';
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};
</script>

<style scoped>
.chat-ui {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

.user {
  align-self: flex-end;
  background-color: #def;
}

.bot {
  align-self: flex-start;
  background-color: #eef;
}

.timestamp {
  font-size: 10px;
  text-align: right;
  color: #666;
  margin-top: 4px;
}
</style>