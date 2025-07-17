export async function filterText(text: string): Promise<string> {
  const bannedWords = ["NG1", "NG2"];
  let filtered = text;
  bannedWords.forEach(word => {
    filtered = filtered.replaceAll(word, "***");
  });
  return filtered;
}