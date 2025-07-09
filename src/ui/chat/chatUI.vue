<template>
  <div class="chat-container">
    <h3>Chat Messages</h3>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.sender }}</strong>: {{ formatMessage(msg.text) }}
        <span class="timestamp">{{ msg.timestamp }}</span>
      </li>
    </ul>
    <ChatInput @message-sent="sendMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import ChatInput from './chatInput.vue';
import { formatMessage } from '@/utils/formatMessage';

export default defineComponent({
  name: 'ChatUI',
  components: { ChatInput },
  setup() {
    const chat = useChatStore();
    const { messages } = storeToRefs(chat);
    const { sendMessage } = chat;

    return { messages, sendMessage, formatMessage };
  }
});
</script>

<style scoped>
.chat-container {
  padding: 16px;
  border: 1px solid #ccc;
}
.timestamp {
  font-size: 0.8em;
  color: #888;
  margin-left: 8px;
}
</style>