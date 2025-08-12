// src/utils/importHelper.ts

// 型定義に依存せずに動作させるため、Message 型の外部参照は行いません。
// 型安全化が必要な場合は、別途 src/types/message.ts を定義し、再度参照してください。

export async function parseImportFile(
  file: File
): Promise<{ botId: string; messages: any[] }> {
  const content = await file.text()

  let data: unknown
  try {
    data = JSON.parse(content)
  } catch {
    throw new Error('インポートファイルがJSONとして不正です')
  }

  const obj = data as { botId?: unknown; messages?: unknown }

  if (typeof obj.botId !== 'string') {
    throw new Error('botIdが不正です')
  }

  if (!Array.isArray(obj.messages)) {
    throw new Error('messagesが配列形式ではありません')
  }

  return {
    botId: obj.botId,
    messages: obj.messages as any[]
  }
}