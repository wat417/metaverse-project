function saveMessages(botId: string, messages: any[]) {
  try {
    const key = `botHistory_${botId}`
    const serialized = JSON.stringify(messages)
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.error(`[保存失敗:${botId}]`, error)
  }
}

function loadMessages(botId: string): any[] {
  try {
    const key = `botHistory_${botId}`
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error(`[読込失敗:${botId}]`, error)
    return []
  }
}

function hasSavedMessages(botId: string): boolean {
  try {
    const key = `botHistory_${botId}`
    const raw = localStorage.getItem(key)
    return !!raw && raw.length > 0
  } catch {
    return false
  }
}

const storageHelper = {
  saveMessages,
  loadMessages,
  hasSavedMessages,
}

export default storageHelper