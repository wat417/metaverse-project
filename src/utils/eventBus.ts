import mitt from "mitt";

type Events = {
  "show-toast": string;
};

const emitter = mitt<Events>();

export const emitToast = (message: string): void => {
  emitter.emit("show-toast", message);
};

export const onToast = (callback: (message: string) => void): void => {
  emitter.on("show-toast", callback);
};