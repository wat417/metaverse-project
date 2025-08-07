// src/router.ts

import { createRouter, createWebHistory } from "vue-router";

import TestNotification from "./dev/testNotification.vue";
import ChartSwitcher from "./dev/chartSwitcher.vue";
import ChartTestPage from "./dev/chartTestPage.vue";
import MainTestPage from "./dev/mainTestPage.vue";
import ChatUI from "./ui/chat/chatUI.vue";

const routes = [
  {
    path: "/testNotification",
    name: "TestNotification",
    component: TestNotification
  },
  {
    path: "/chartSwitcher",
    name: "ChartSwitcher",
    component: ChartSwitcher
  },
  {
    path: "/chartTestPage",
    name: "ChartTestPage",
    component: ChartTestPage
  },
  {
    path: "/mainTestPage",
    name: "MainTestPage",
    component: MainTestPage
  },
  {
    path: "/chat",
    name: "ChatUI",
    component: ChatUI
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});