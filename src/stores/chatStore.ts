import { defineStore } from 'pinia'
import { ref, computed, watch, unref } from 'vue'
import storageHelper from '@/utils/storageHelper'

interface Message {
  id: string
  botId: string
  content: string
  timestamp: number
}

interface ImportedData {
  botId: string
  messages: Message[]
}

export const useChatStore = defineStore('chat', () => {
  const selectedBotId = ref<string | null>(null)
  const messages = ref<Message[]>([])
  const importedMessages = ref<Record<string, Message[]>>({})

  const filteredMessages = computed(() => {
    const botId = unref(selectedBotId)
    return messages.value.filter(m => m.botId === botId)
  })

  function applyImportedMessages(data: ImportedData) {
    const { botId, messages: newMessages } = data
    importedMessages.value[botId] = newMessages
    messages.value = messages.value
      .filter(m => m.botId !== botId)
      .concat(newMessages)
    storageHelper.saveMessages(botId, newMessages)
  }

  watch(selectedBotId, (newId) => {
    if (typeof newId === 'string') {
      const restored = storageHelper.loadMessages(newId)
      if (restored && Array.isArray(restored)) {
        const preserved = messages.value.filter(m => m.botId !== newId)
        messages.value = preserved.concat(restored)
      }
    }
  })

  return {
    selectedBotId,
    messages,
    filteredMessages,
    applyImportedMessages,
  }
})