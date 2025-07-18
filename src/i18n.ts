// src/i18n.ts

import { createI18n } from "vue-i18n";
import notificationMessages from "@/assets/i18n/notificationMessage.json";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: notificationMessages
});

export { i18n };