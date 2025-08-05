// src/router.ts

import { createRouter, createWebHistory } from "vue-router";
import TestNotification from "@/dev/testNotification.vue";
import ChartSwitcher from "@/dev/chartSwitcher.vue";
import ChartTestPage from "@/dev/chartTestPage.vue";

const routes = [
  {
    path: "/dev/testNotification",
    name: "TestNotification",
    component: TestNotification
  },
  {
    path: "/dev/chartSwitcher",
    name: "ChartSwitcher",
    component: ChartSwitcher
  },
  {
    path: "/dev/chartTestPage",
    name: "ChartTestPage",
    component: ChartTestPage
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});