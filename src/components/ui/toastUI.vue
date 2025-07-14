<template>
  <transition name="toast-fade">
    <div v-if="visible" class="toast-container" :class="type" :style="customStyle">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ToastUI",
  props: {
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    duration: { type: Number, default: 3000 },
    position: { type: String, default: "bottom-right" }
  },
  data() {
    return { visible: false };
  },
  computed: {
    customStyle() {
      const map = {
        "bottom-right": { bottom: "20px", right: "20px" },
        "top-right": { top: "20px", right: "20px" },
        "bottom-left": { bottom: "20px", left: "20px" },
        "top-left": { top: "20px", left: "20px" }
      };
      return Object.assign({ position: "fixed", zIndex: 1000 }, map[this.position] || {});
    }
  },
  mounted() {
    this.visible = true;
    setTimeout(() => this.visible = false, this.duration);
  }
};
</script>

<style scoped>
.toast-container {
  padding: 12px 20px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.toast-container.info { background-color: #0078D4; }
.toast-container.success { background-color: #28a745; }
.toast-container.error { background-color: #dc3545; }

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.4s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>