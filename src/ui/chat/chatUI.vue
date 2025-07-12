<script setup lang="ts">
import { ref, watch, nextTick, unref } from 'vue'
import { useChatStore } from '@/stores/chatStore'

const loadingHistory = ref(false)
const { selectedBotId, messages } = useChatStore()

watch(
  () => unref(selectedBotId),
  async (id) => {
    if (typeof id === 'string') {
      loadingHistory.value = true
      await nextTick()
      loadingHistory.value = false
    }
  }
)
</script>