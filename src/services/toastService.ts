import { i18n } from '@/i18n';

export type ToastOptions = {
  messageType: string;
};

export const toastService = {
  show(options: ToastOptions) {
    const lang = i18n.global.locale.value;
    const messages = i18n.global.messages.value[lang];
    const message =
      messages?.[options.messageType] ?? messages?.['default'] ?? '通知';

    console.log('TOAST:', message);
  }
};