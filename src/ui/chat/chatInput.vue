<template>
  <div class="chat-input">
    <input v-model="inputText" placeholder="メッセージを入力" />
    <button @click="sendMessage">送信</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ChatInput',
  emits: ['message-sent'],
  setup(_, { emit }) {
    const inputText = ref('');

    const sendMessage = () => {
      if (inputText.value.trim()) {
        emit('message-sent', inputText.value.trim());
        inputText.value = '';
      }
    };

    return { inputText, sendMessage };
  }
});
</script>

<style scoped>
.chat-input {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>