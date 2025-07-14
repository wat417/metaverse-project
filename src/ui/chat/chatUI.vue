<template>
  <div class="chat-ui">
    <button @click="handleSave">保存</button>
  </div>
</template>

<script setup>
import { toastService } from '@/services/toastService';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();

function handleSave() {
  chatStore.saveChatHistory();
  toastService.show('保存が完了しました', 'success');
}
</script>

<style scoped>
/* UIスタイル未定義のため CSS セクションを削除 */
</style>