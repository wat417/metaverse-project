import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Message } from '@/types/message'
import { saveBotHistory, loadBotHistory } from '@/utils/storageHelper'

export const useChatStore = defineStore('chat', () => {
  const selectedBotId = ref<string | null>(null)
  const messages = ref<Message[]>([])

  watch(() => selectedBotId.value, async (id) => {
    if (id) {
      const restored = await loadBotHistory(id)
      messages.value = restored ?? []
    }
  })

  watch(() => messages.value, async (current) => {
    if (selectedBotId.value) {
      await saveBotHistory(selectedBotId.value, current)
    }
  })

  return {
    selectedBotId,
    messages,
  }
})