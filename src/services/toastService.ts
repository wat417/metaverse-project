import { i18n } from '@/i18n';

export type ToastOptions = {
  messageType: keyof typeof i18n.global.messages.value['ja'];
};

export const toastService = {
  show(options: ToastOptions) {
    const lang = i18n.global.locale.value;
    const messages = i18n.global.messages.value[lang];
    const message = messages?.[options.messageType] ?? messages?.['default'];
    console.log('TOAST:', message);
  },
};