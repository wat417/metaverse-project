<template>
  <div style="padding: 24px">
    <h2>Step101 NGログ出力検証</h2>
    <label>ユーザーID：</label>
    <input v-model="userId" placeholder="user123" />
    <br /><br />
    <label>テスト文：</label>
    <input v-model="inputText" placeholder="文を入力" />
    <br /><br />
    <label>匿名状態：</label>
    <select v-model="isAnonymous">
      <option :value="true">匿名</option>
      <option :value="false">非匿名</option>
    </select>
    <br /><br />
    <button @click="verifyAndLog">NG検出ログ送信</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { applyFilteredText } from "../chat/filterContext";
import { logChatFilterViolation } from "../log/genericEventLogger";
import { ref } from "vue";

const inputText = ref("");
const resultMessage = ref("");
const isAnonymous = ref(true);
const userId = ref("");

function verifyAndLog() {
  const filterResult = applyFilteredText(inputText.value, isAnonymous.value);
  const flagged = filterResult.flagged;
  const masked = filterResult.masked;
  const matchedTerms = filterResult.matchedTerms || [];

  if (!userId.value.trim()) {
    resultMessage.value = "⚠️ ユーザーIDを入力してください";
    return;
  }

  if (flagged) {
    logChatFilterViolation(userId.value, inputText.value, matchedTerms, isAnonymous.value);
    resultMessage.value = isAnonymous.value
      ? "⚠️ NG検出：送信ブロック → ログ記録完了"
      : `⚠️ NG検出：マスク後 → ${masked} → ログ記録完了`;
  } else {
    resultMessage.value = "✅ フィルター通過（ログ記録なし）";
  }
}
</script>