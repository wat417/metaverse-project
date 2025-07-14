import { createApp } from 'vue';
import ToastUI from '../components/ui/toastUI.vue';

let currentToast: { app: any, container: HTMLElement } | null = null;

interface ToastOptions {
  type?: string;
  duration?: number;
  position?: string;
}

export const toastService = {
  show(message: string, options: ToastOptions = {}) {
    // 既存トーストを解除
    if (currentToast) {
      currentToast.app.unmount();
      document.body.removeChild(currentToast.container);
      currentToast = null;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = createApp(ToastUI, {
      message,
      type: options.type || 'info',
      duration: options.duration || 3000,
      position: options.position || 'bottom-right'
    });

    app.mount(container);

    currentToast = { app, container };

    // duration後に自動解除
    setTimeout(() => {
      app.unmount();
      document.body.removeChild(container);
      currentToast = null;
    }, options.duration || 3000);
  }
};