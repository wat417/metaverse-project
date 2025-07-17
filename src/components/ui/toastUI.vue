<template>
  <div v-if="message" class="chat-notice">
    {{ message }}
  </div>
</template>

<script>
import { onToast } from "@/utils/eventBus";

export default {
  data() {
    return {
      message: ""
    };
  },
  created() {
    onToast(this.showToast);
  },
  methods: {
    showToast(notice) {
      this.message = notice;
      setTimeout(() => {
        this.message = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
.chat-notice {
  background-color: #f5f5f5;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 14px;
}
</style>