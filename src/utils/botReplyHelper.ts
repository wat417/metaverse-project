export const generateBotReply = async (userMessage: string): Promise<string> => {
  await delay(500); // 応答生成待機（仮処理）
  return `Bot応答: ${userMessage}`;
};

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));