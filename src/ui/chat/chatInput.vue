<!-- ui/chat/chatInput.vue -->

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

const message = ref('');
const chatStore = useChatStore();

const handleSend = async () => {
  if (message.value.trim()) {
    const botId = chatStore.selectedBotId || 'bot_001';

    // ユーザー送信メッセージを履歴へ追加
    const userMessage = {
      id: `user-${Date.now()}`,
      text: message.value,
      sender: 'user',
      botId,
      timestamp: Date.now(),
      replyState: 'pending',
    };
    chatStore.addMessage(userMessage);

    // Bot応答を取得 → 既に内部で履歴追加されるため UI側で再追加は不要
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