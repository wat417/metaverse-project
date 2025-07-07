/**
 * RTDBへの保存処理
 */
export function writeLog(path: string, data: any): void {
  // RTDB保存処理（実装詳細は省略）
  // 例：firebase.database().ref(path).set(data);
}

/**
 * Step履歴ログをMarkdown形式に変換（テンプレート準拠）
 */
export function createMarkdownStepLog(event: {
  eventId: string
  timestamp: number
}): string {
  const step = event.eventId
  const time = new Date(event.timestamp).toISOString().slice(0, 16).replace("T", " ")
  return `- ${step}：完了（${time}）`
}