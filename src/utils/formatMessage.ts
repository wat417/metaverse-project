export function formatMessage(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}