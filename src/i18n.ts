import { createI18n } from 'vue-i18n';
import type { MessageSchema } from '@/types/i18nTypes';
import notificationMessages from '@/assets/i18n/notificationMessages.json';

const i18n = createI18n<[MessageSchema], 'ja' | 'en'>({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'en',
  messages: notificationMessages
});

export { i18n };