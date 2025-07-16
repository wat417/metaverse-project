import { httpsCallable, getFunctions } from 'firebase/functions';
import { app } from '@/config/firebase';
import messages from '@/config/notificationMessage.json';

const functions = getFunctions(app);

export async function applyChatFilter(text: string, lang: string = 'ja'): Promise<string> {
  try {
    const chatFilter = httpsCallable(functions, 'chatFilter');
    const response = await chatFilter({ text });

    if (
      typeof response?.data === 'object' &&
      response.data !== null &&
      'result' in response.data &&
      typeof response.data.result === 'string'
    ) {
      const result = response.data.result;

      if (text !== result) {
        const message =
          messages[lang]?.filterNotice ?? messages['ja']?.filterNotice ?? '';
        if (message) displayChatNotice(message);
      }

      return result;
    }

    return text;
  } catch (error) {
    console.error('Filter error:', error);
    return text;
  }
}

function displayChatNotice(message: string): void {
  const noticeElement = document.createElement('div');
  noticeElement.textContent = message;
  noticeElement.className = 'chat-notice';
  document.body.appendChild(noticeElement);
}