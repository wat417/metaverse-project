<template>
  <div style="padding: 24px">
    <h2>Step100 チャットフィルター検証</h2>
    <label>テスト文：</label>
    <input v-model="inputText" placeholder="文を入力" />
    <br /><br />
    <label>匿名状態：</label>
    <select v-model="isAnonymous">
      <option :value="true">匿名</option>
      <option :value="false">非匿名</option>
    </select>
    <br /><br />
    <button @click="verify">フィルター検証</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { applyFilteredText } from "../chat/filterContext";
import { ref } from "vue";

const inputText = ref("");
const resultMessage = ref("");
const isAnonymous = ref(true);

function verify() {
  const { flagged, masked } = applyFilteredText(inputText.value, isAnonymous.value);
  if (flagged) {
    resultMessage.value = isAnonymous.value
      ? "⚠️ NG検出：送信ブロック"
      : `⚠️ NG検出：マスク後 → ${masked}`;
  } else {
    resultMessage.value = "✅ フィルター通過";
  }
}
</script>