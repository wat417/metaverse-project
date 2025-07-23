<template>
  <div style="padding: 24px">
    <h2>Step99 チャットフィルター検証</h2>
    <input v-model="inputText" placeholder="テスト文を入力" />
    <button @click="verify">フィルター検証</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { applyChatFilter } from "../../functions/chatFilter";
import { ref } from "vue";

const inputText = ref("");
const resultMessage = ref("");

function verify() {
  const { flagged, masked } = applyChatFilter(inputText.value);
  resultMessage.value = flagged
    ? `⚠️ NG検出：マスク後 → ${masked}`
    : "✅ フィルター通過";
}
</script>