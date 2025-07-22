<template>
  <div v-if="visible" :class="['toast', statusClass]">
    <i :class="iconClass" class="toast-icon"></i>
    <span class="toast-message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const statusClass = computed(() => {
      switch (props.status) {
        case 'success':
          return 'toast-success'
        case 'error':
          return 'toast-error'
        case 'warning':
          return 'toast-warning'
        default:
          return ''
      }
    })

    const iconClass = computed(() => {
      switch (props.status) {
        case 'success':
          return 'icon-check'
        case 'error':
          return 'icon-error'
        case 'warning':
          return 'icon-warning'
        default:
          return ''
      }
    })

    return { statusClass, iconClass }
  },
})
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
}
.toast-success {
  background-color: #e6ffed;
  color: #22863a;
}
.toast-error {
  background-color: #ffeef0;
  color: #d73a49;
}
.toast-warning {
  background-color: #fff5b1;
  color: #735c0f;
}
.toast-icon {
  margin-right: 8px;
}
.icon-check::before {
  content: '✔️';
}
.icon-error::before {
  content: '❌';
}
.icon-warning::before {
  content: '⚠️';
}
</style>