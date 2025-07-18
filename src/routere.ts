// src/routere.ts

import { createRouter, createWebHistory } from "vue-router";
import TestNotification from "@/dev/testNotification.vue";

const routes = [
  {
    path: "/dev/testNotification",
    name: "TestNotification",
    component: TestNotification
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});