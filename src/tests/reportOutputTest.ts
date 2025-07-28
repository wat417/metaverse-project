// reportOutputTest.ts
import { generateReport } from '../chat/reportBuilder'
import type { ChatEvent } from '../types/message'

const mockEvents: ChatEvent[] = [
  { timestamp: '2025-07-26T10:00:00', text: 'ログイン', type: 'status.userJoined' },
  { timestamp: '2025-07-26T10:01:00', text: 'メッセージ', type: 'chat.messageSent' }
]

async function testOutput() {
  const formats: Array<'markdown' | 'json' | 'statistics' | 'history'> = ['markdown', 'json', 'statistics', 'history']
  for (const f of formats) {
    const result = await generateReport(mockEvents, f)
    console.log(`--- [${f}] ---\n${result}`)
  }
}

testOutput()