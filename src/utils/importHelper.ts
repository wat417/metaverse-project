import type { Message } from '@/types/message'

export async function parseImportFile(file: File): Promise<{ botId: string, messages: Message[] }> {
  const content = await file.text()
  const data = JSON.parse(content)

  if (typeof data.botId !== 'string') {
    throw new Error('botIdが不正です')
  }

  if (!Array.isArray(data.messages)) {
    throw new Error('messagesが配列形式ではありません')
  }

  return {
    botId: data.botId,
    messages: data.messages as Message[]
  }
}