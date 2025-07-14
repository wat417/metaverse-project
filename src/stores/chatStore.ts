import { defineStore } from 'pinia';
import { toastService } from '@/services/toastService';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as any[],
    selectedBotId: null
  }),
  actions: {
    saveChatHistory() {
      // 保存処理（仮）
      toastService.show("履歴が保存されました。", { type: "success" });
    },
    applyImportedMessages(imported: any[]) {
      this.messages = imported;
      toastService.show("インポートが完了しました。", { type: "success" });
    }
  }
});