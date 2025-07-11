<template>
  <div class="input-container">
    <input
      v-model="message"
      @keydown.enter="handleSend"
      placeholder="Type a message..."
    />
    <button @click="handleSend">Send</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { generateBotReply } from '@/handlers/messageHandler';
import type { Message, ReplyState } from '@/types/message';

const message = ref('');
const chatStore = useChatStore();

const handleSend = async () => {
  if (message.value.trim()) {
    const botId = chatStore.selectedBotId;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: message.value,
      sender: 'user',
      botId,
      timestamp: Date.now(),
      replyState: 'pending',
    };

    chatStore.addMessage(userMessage);
    chatStore.setReplyState(botId, 'pending');

    await generateBotReply(botId, message.value);
    message.value = '';
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 12px;
}
</style>