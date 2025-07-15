<template>
  <div class="toast" :aria-label="message">
    {{ message }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.toast {
  padding: 1em;
  background: #333;
  color: #fff;
  max-width: 90%;
  word-break: break-word;
}
</style>