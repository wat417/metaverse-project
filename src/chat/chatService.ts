import { getFunctions, httpsCallable, HttpsCallable } from 'firebase/functions';
import { app } from '../config/firebase';

type FilterRequest = { text: string };
type FilterResponse = { result: string };

export const applyChatFilter = async (text: string): Promise<string> => {
  const functions = getFunctions(app);
  const filterFunction: HttpsCallable<FilterRequest, FilterResponse> =
    httpsCallable(functions, 'chatFilter');

  try {
    const response = await filterFunction({ text });
    return response.data.result;
  } catch (error) {
    console.error('フィルター関数呼び出しエラー:', error);
    return text;
  }
};