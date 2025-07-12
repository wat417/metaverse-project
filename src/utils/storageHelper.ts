import type { Message } from '@/types/message'

const DB_NAME = 'copilot_bot_history_db'
const STORE_NAME = 'botHistories'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'botId' })
      }
    }
  })
}

export async function saveBotHistory(botId: string, messages: Message[]): Promise<void> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.put({ botId, messages })
  tx.onerror = () => console.error('履歴保存失敗:', botId)
}

export async function loadBotHistory(botId: string): Promise<Message[] | null> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  return new Promise((resolve, reject) => {
    const request = store.get(botId)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result?.messages ?? null)
  })
}