// src/main_ui.ts

import { createApp } from "vue";
import { i18n } from "@/i18n";
import { router } from "./routere";
import App from "@/dev/chartTestPage.vue"; // ← 差し替え

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");