<!-- src/ui/chat/chatUI.vue -->
<template>
  <!-- Bot選択UI追加 -->
  <select v-model="chatStore.selectedBotId">
    <option value="defaultBot">Default Bot</option>
    <!-- 他Bot選択肢追加予定 -->
  </select>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
const chatStore = useChatStore();
</script>