import { getFunctions, httpsCallable } from 'firebase/functions';

export const sanitizeInput = async (input: string): Promise<string> => {
  const functions = getFunctions(); // Firebase instance取得
  const chatFilter = httpsCallable(functions, 'chatFilter');
  const response = await chatFilter({ text: input });
  return (response.data as { result: string }).result;
};