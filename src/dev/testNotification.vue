<!-- src/dev/testNotification.vue -->
<template>
  <div style="padding: 24px">
    <h2>Step89-6 通知表示テスト</h2>
    <button @click="showJa">通知：日本語</button>
    <button @click="showEn" style="margin-left: 8px">通知：英語</button>
  </div>
</template>

<script setup lang="ts">
import { i18n } from "@/i18n";
import { displayNotice } from "@/services/toastService";

function showJa() {
  i18n.global.locale.value = "ja";
  displayNotice("teamSelected");
}

function showEn() {
  i18n.global.locale.value = "en";
  displayNotice("teamSelected");
}
</script>