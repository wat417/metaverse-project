import * as functions from 'firebase-functions';
import { filterText } from './filterRules';

export const chatFilter = functions.https.onCall((data: any, context) => {
  const inputText = data?.text || '';
  const filtered = filterText(inputText);
  return { result: filtered };
});