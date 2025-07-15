import { createI18n } from 'vue-i18n';
import notificationMessages from '@/assets/i18n/notificationMessages.json';

const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'en',
  messages: notificationMessages as Record<string, Record<string, string>>
});

export { i18n };