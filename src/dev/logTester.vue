<template>
  <div class="log-tester">
    <h3>ログ送信検証</h3>
    <button @click="sendUserActionLog">アクションログ送信</button>
  </div>
</template>

<script lang="ts" setup>
import { logGenericUserAction } from "@/log/eventLogger";

function sendUserActionLog() {
  logGenericUserAction("user_test_001", "openModal", "logTester", { value: true });
}
</script>

<style scoped>
.log-tester {
  padding: 1rem;
}
</style>