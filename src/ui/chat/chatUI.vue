<template>
  <div>
    <select v-model="selectedBotId">
      <option v-for="bot in bots" :key="bot.id" :value="bot.id">{{ bot.name }}</option>
    </select>

    <div class="save-status">
      <span v-if="hasSavedHistory">保存済み履歴あり</span>
      <span v-else>保存履歴なし</span>
    </div>

    <button @click="handleSave">履歴を保存</button>

    <ul v-if="filteredMessages.length > 0">
      <li v-for="msg in filteredMessages" :key="msg.id">{{ msg.content }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, unref } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import storageHelper from '@/utils/storageHelper'
import toastService from '@/services/toastService'

const { selectedBotId, filteredMessages } = useChatStore()

const bots = ref([
  { id: 'bot1', name: 'Bot One' },
  { id: 'bot2', name: 'Bot Two' }
])

const hasSavedHistory = ref(false)

function checkHistory(botId: string) {
  hasSavedHistory.value = storageHelper.hasSavedMessages(botId)
}

function handleSave() {
  const botId = unref(selectedBotId)
  if (typeof botId === 'string') {
    storageHelper.saveMessages(botId, unref(filteredMessages))
    checkHistory(botId)
    toastService.show(`Bot「${botId}」の履歴を保存しました`)
  }
}

watch(() => unref(selectedBotId), (newId) => {
  if (typeof newId === 'string') checkHistory(newId)
})

onMounted(() => {
  const initialBotId = unref(selectedBotId)
  if (typeof initialBotId === 'string') checkHistory(initialBotId)
})
</script>

<style scoped>
.save-status {
  margin: 8px 0;
  font-weight: bold;
}
</style>