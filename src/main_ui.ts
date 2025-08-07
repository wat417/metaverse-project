// src/main_ui.ts

import { createApp } from "vue";
import { i18n } from "@/i18n";
import { router } from "./router";
import App from "./App.vue"; // ✅ router-view を含むエントリコンポーネント

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");