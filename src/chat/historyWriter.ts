// historyWriter.ts
import { getDatabase, ref, push } from 'firebase/database'
import type { ChatEvent } from '../types/message'
import { getRTDB } from '../firebase/rtdbConfig'

export async function writeHistory(event: ChatEvent): Promise<void> {
  const db = getRTDB()
  const historyRef = ref(db, 'history')
  await push(historyRef, {
    timestamp: event.timestamp,
    type: event.type,
    text: event.text
  })
}